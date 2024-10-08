/*
* This is an altered version of the image-button-response plugin
* It has been edited to allow for a dropdown selection of nested buttons.
* It also allows certain data from a file to be shown on a button press.
*/

var jsPsychImageButtonResponse = (function (jspsych) {
    'use strict';
  
    const info = {
        name: "image-button-response",
        parameters: {
            /** The image to be displayed */
            stimulus: {
                type: jspsych.ParameterType.IMAGE,
                pretty_name: "Stimulus",
                default: undefined,
            },
            /** Set the image height in pixels */
            stimulus_height: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Image height",
                default: null,
            },
            /** Set the image width in pixels */
            stimulus_width: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Image width",
                default: null,
            },
            /** Maintain the aspect ratio after setting width or height */
            maintain_aspect_ratio: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Maintain aspect ratio",
                default: true,
            },
            /** Array containing the label(s) for the button(s). */
            choices: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Choices",
                default: undefined,
                array: true,
            },
            /** The HTML for creating button. Can create own style. Use the "%choice%" string to indicate where the label from the choices parameter should be inserted. */
            button_html: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Button HTML",
                default: '<button class="jspsych-btn">%choice%</button>',
                array: true,
            },
            /** Any content here will be displayed under the button. */
            prompt: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Prompt",
                default: null,
            },
            /** How long to show the stimulus. */
            stimulus_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Stimulus duration",
                default: null,
            },
            /** How long to show the trial. */
            trial_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Trial duration",
                default: null,
            },
            /** The vertical margin of the button. */
            margin_vertical: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Margin vertical",
                default: "0px",
            },
            /** The horizontal margin of the button. */
            margin_horizontal: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Margin horizontal",
                default: "8px",
            },
            /** If true, then trial will end when user responds. */
            response_ends_trial: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Response ends trial",
                default: true,
            },
            /**
             * If true, the image will be drawn onto a canvas element (prevents blank screen between consecutive images in some browsers).
             * If false, the image will be shown via an img element.
             */
            render_on_canvas: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Render on canvas",
                default: true,
            },
            scenarioObject: {
                type: Object,
                pretty_name: "Trial Object",
                default: {},
            },
            shuffle_buttons : {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Shuffle Buttons",
              default: false,
            },
            endButton : {
                type: jspsych.ParameterType.STRING,
                pretty_name: "End Button",
                default: "Enter Answers",
            },
            button_delay : {
              type:jspsych.ParameterType.INT,
              pretty_name: "Button Delay",
              default: 0,
            }
        },
    };
    /**
     * **image-button-response**
     *
     * jsPsych plugin for displaying an image stimulus and getting a button response
     *
     * @author Josh de Leeuw
     * @see {@link https://www.jspsych.org/plugins/jspsych-image-button-response/ image-button-response plugin documentation on jspsych.org}
     */
    class ImageButtonResponsePlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }
        trial(display_element, trial) {
            var height, width;
            var html;
            if (trial.render_on_canvas) {
                var image_drawn = false;
                // first clear the display element (because the render_on_canvas method appends to display_element instead of overwriting it with .innerHTML)
                if (display_element.hasChildNodes()) {
                    // can't loop through child list because the list will be modified by .removeChild()
                    while (display_element.firstChild) {
                        display_element.removeChild(display_element.firstChild);
                    }
                }
                // create canvas element and image
                var canvas = document.createElement("canvas");
                canvas.id = "jspsych-image-button-response-stimulus";
                canvas.style.margin = "0";
                canvas.style.padding = "0";
                var ctx = canvas.getContext("2d");
                var img = new Image();
                img.onload = () => {
                    // if image wasn't preloaded, then it will need to be drawn whenever it finishes loading
                    if (!image_drawn) {
                        getHeightWidth(); // only possible to get width/height after image loads
                        ctx.drawImage(img, 0, 0, width, height);
                    }
                };
                img.src = trial.stimulus;
                // get/set image height and width - this can only be done after image loads because uses image's naturalWidth/naturalHeight properties
                const getHeightWidth = () => {
                    if (trial.stimulus_height !== null) {
                        height = trial.stimulus_height;
                        if (trial.stimulus_width == null && trial.maintain_aspect_ratio) {
                            width = img.naturalWidth * (trial.stimulus_height / img.naturalHeight);
                        }
                    }
                    else {
                        height = img.naturalHeight;
                    }
                    if (trial.stimulus_width !== null) {
                        width = trial.stimulus_width;
                        if (trial.stimulus_height == null && trial.maintain_aspect_ratio) {
                            height = img.naturalHeight * (trial.stimulus_width / img.naturalWidth);
                        }
                    }
                    else if (!(trial.stimulus_height !== null && trial.maintain_aspect_ratio)) {
                        // if stimulus width is null, only use the image's natural width if the width value wasn't set
                        // in the if statement above, based on a specified height and maintain_aspect_ratio = true
                        width = img.naturalWidth;
                    }
                    canvas.height = height;
                    canvas.width = width;
                };
                getHeightWidth(); // call now, in case image loads immediately (is cached)
                // create buttons
                var buttons = [];
                if (Array.isArray(trial.button_html)) {
                    if (trial.button_html.length == trial.choices.length) {
                        buttons = trial.button_html;
                    }
                    else {
                        console.error("Error in image-button-response plugin. The length of the button_html array does not equal the length of the choices array");
                    }
                }
                else {
                    for (var i = 0; i < trial.choices.length; i++) {
                        buttons.push(trial.button_html);
                    }
                }
                var btngroup_div = document.createElement("div");
                btngroup_div.id = "jspsych-image-button-response-btngroup";
                html = "";
                for (var i = 0; i < trial.choices.length; i++) {
                    var str = buttons[i].replace(/%choice%/g, trial.choices[i]);
                    html +=
                        '<div class="jspsych-image-button-response-button" style="display: inline-block; margin:' +
                            trial.margin_vertical +
                            " " +
                            trial.margin_horizontal +
                            '" id="jspsych-image-button-response-button-' +
                            i +
                            '" data-choice="' +
                            i +
                            '">' +
                            str +
                            "</div>";
                }
                btngroup_div.innerHTML = html;
                // add canvas to screen and draw image
                display_element.insertBefore(canvas, null);
                if (img.complete && Number.isFinite(width) && Number.isFinite(height)) {
                    // if image has loaded and width/height have been set, then draw it now
                    // (don't rely on img onload function to draw image when image is in the cache, because that causes a delay in the image presentation)
                    ctx.drawImage(img, 0, 0, width, height);
                    image_drawn = true;
                }
                // add buttons to screen
                display_element.insertBefore(btngroup_div, canvas.nextElementSibling);
                
                // Ensure all buttons are enabled except the end button
                buttons = display_element.querySelectorAll("button");

                buttons.forEach((button, index) => {
                    // Compare the choice's text to trial.endButton
                    if (trial.choices[index] === trial.endButton) {
                        // Disable the end button
                        button.disabled = true;
                        console.log(`End button found and disabled: ${trial.choices[index]}`);
                    } else {
                        // Enable all other buttons
                        button.disabled = false;
                    }
                });
                // add prompt if there is one
                if (trial.prompt !== null) {
                    display_element.insertAdjacentHTML("beforeend", trial.prompt);
                }
            }
            else {
                // display stimulus as an image element
                html = '<img src="' + trial.stimulus + '" id="jspsych-image-button-response-stimulus">';
                //display buttons
                var buttons = [];
                if (Array.isArray(trial.button_html)) {
                    if (trial.button_html.length == trial.choices.length) {
                        buttons = trial.button_html;
                    }
                    else {
                        console.error("Error in image-button-response plugin. The length of the button_html array does not equal the length of the choices array");
                    }
                }
                else {
                    for (var i = 0; i < trial.choices.length; i++) {
                        buttons.push(trial.button_html);
                    }
                }
                html += '<div id="jspsych-image-button-response-btngroup">';
                for (var i = 0; i < trial.choices.length; i++) {
                    var str = buttons[i].replace(/%choice%/g, trial.choices[i]);
                    html +=
                        '<div class="jspsych-image-button-response-button" style="display: inline-block; margin:' +
                            trial.margin_vertical +
                            " " +
                            trial.margin_horizontal +
                            '" id="jspsych-image-button-response-button-' +
                            i +
                            '" data-choice="' +
                            i +
                            '">' +
                            str +
                            "</div>";
                }
                html += "</div>";
                // add prompt
                if (trial.prompt !== null) {
                    html += trial.prompt;
                }
                // update the page content
                display_element.innerHTML = html;
                // set image dimensions after image has loaded (so that we have access to naturalHeight/naturalWidth)
                var img = display_element.querySelector("#jspsych-image-button-response-stimulus");
                if (trial.stimulus_height !== null) {
                    height = trial.stimulus_height;
                    if (trial.stimulus_width == null && trial.maintain_aspect_ratio) {
                        width = img.naturalWidth * (trial.stimulus_height / img.naturalHeight);
                    }
                }
                else {
                    height = img.naturalHeight;
                }
                if (trial.stimulus_width !== null) {
                    width = trial.stimulus_width;
                    if (trial.stimulus_height == null && trial.maintain_aspect_ratio) {
                        height = img.naturalHeight * (trial.stimulus_width / img.naturalWidth);
                    }
                }
                else if (!(trial.stimulus_height !== null && trial.maintain_aspect_ratio)) {
                    // if stimulus width is null, only use the image's natural width if the width value wasn't set
                    // in the if statement above, based on a specified height and maintain_aspect_ratio = true
                    width = img.naturalWidth;
                }
                img.style.height = height.toString() + "px";
                img.style.width = width.toString() + "px";
            }
            // start timing
            var start_time = performance.now();
            let count = 1;
            for (var i = 0; i < trial.choices.length; i++) {
                let button = display_element.querySelector("#jspsych-image-button-response-button-" + i);
                if (trial.choices[i] === trial.endButton) {
                    // Initially disable the end button
                    button.querySelector("button").disabled = true;
                }
                button.addEventListener("click", (e) => {
                    // when a button is clicked.
                    var btn_el = e.currentTarget;
                    var choice = btn_el.getAttribute("data-choice"); // don't use dataset for jsdom compatibility
                    var txt = btn_el.textContent || btn_el.innerText;
                    var canvas = document.querySelector('#jspsych-content');
                    let img = display_element.querySelector("#jspsych-image-button-response-stimulus");
                    img.classList.add('hidden');
                    // if (canvas.querySelector('p') != null)
                    // {
                    //   canvas.querySelector('p').remove();
                    // }
                    if (canvas.querySelector('#currentRes') != null)
                    {
                      canvas.querySelector('#currentRes').remove();
                    }
                    if (canvas.querySelector('#jspsych-image-button-response-btngrouplevel2') != null)
                    {
                      canvas.querySelector('#jspsych-image-button-response-btngrouplevel2').remove();
                    }
                    display_element.querySelector("#jspsych-image-button-response-stimulus").className +=
                    " responded";
                    if (txt == trial.endButton) {
                        if (!button.querySelector("button").disabled) {  // Ensure it isn't disabled
                            var end_time = performance.now();
                            var rt = Math.round(end_time - start_time);
                            response.totalTime = parseInt(rt);
                            end_trial();
                        };
                    }
                    else
                    {
                      let testObject = trial.scenarioObject[txt];
                      let divGroup;
                      let canvas = document.querySelector("#jspsych-content");
                      if (typeof document.querySelector("#jspsych-image-button-response-btngrouplevel2" === 'undefined'))
                      {
                        divGroup = canvas.appendChild(document.createElement('div'));
                        divGroup.id = "jspsych-image-button-response-btngrouplevel2";
                      }
                      else
                      {
                        divGroup = document.querySelector("#jspsych-image-button-response-btngrouplevel2");
                      }
                      let alphabet = "abcdefghijklmnopqrstuvwxyz";
                      let entries = Object.entries(testObject);
                      if(trial.shuffle_buttons)
                      {
                          let array = entries;
                          let counter = array.length;
  
                          // While there are elements in the array
                          while (counter > 0) {
                              // Pick a random index
                              let index = Math.floor(Math.random() * counter);
  
                              // Decrease counter by 1
                              counter--;
  
                              // And swap the last element with it
                              let temp = array[counter];
                              array[counter] = array[index];
                              array[index] = temp;
                          }
                          entries = array;
                      }

                      // Now bind the nested buttons immediately
                    let count = 1;
                    entries.forEach(([innerkey, value]) => {
                        let btnDiv = divGroup.appendChild(document.createElement("div"));
                        btnDiv.className = "jspsych-image-button-response-button-level2";
                        btnDiv.id = "jspsych-image-button-response-button-level2-" + count;
                        let innerBtn = btnDiv.appendChild(document.createElement("button"));
                        innerBtn.innerHTML = innerkey;
                        innerBtn.id = "Test" + (innerkey.replace(/\s/g, ''));
                        innerBtn.className = "jspsych-btn";
                        innerBtn.value = count;
                        innerBtn.style = "display: inline-block; margin:7px 8px";

                        // Event listener for nested button
                        innerBtn.addEventListener("click", (e) => {
                            // Remove previous result if any
                            if (canvas.querySelector('#currentRes') != null) {
                                canvas.querySelector('#currentRes').remove();
                            }

                            // Display the output (image or text)
                            (response.buttons).push(innerBtn.value);
                            let timeNow = performance.now();
                            var rt = Math.round(timeNow - start_time);
                            (response.rt).push(parseInt(rt));
                            let output = testObject[innerkey]["Output"];
                            let duration = testObject[innerkey]["Duration"];
                            response.totalTestDuration += duration;

                            if (output.includes(".jpg")) {
                                let testRes = innerBtn.appendChild(document.createElement("img"));
                                testRes.src = "./assets/" + output;
                                testRes.style = "height: 30em; width: 50em";
                                testRes.id = "currentRes";
                            } else {
                                let testRes = innerBtn.appendChild(document.createElement("p"));
                                testRes.innerHTML = output;
                                testRes.id = "currentRes";
                                testRes.style = "color: blue;";
                            }

                            // Enable the end button after a nested button is clicked
                            let buttons = display_element.querySelectorAll("button");
                            let endButton = null;

                            // Loop over the buttons to find the one with the correct text
                            buttons.forEach((button) => {
                                if (button.textContent.trim() === trial.endButton) {
                                    endButton = button;
                                }
                            });

                            if (endButton) {
                                endButton.disabled = false;
                                console.log(`End button is now enabled: ${trial.endButton}`);
                            } else {
                                console.error('End button not found!');
                            }
                        });

                        count++;
                    });
                    }
                });
            }
            // store response
            var response = {
                rt: [],
                buttons: [],
                tests: [],
                totalTime: null,
                totalTestDuration: 0
            };
            // function to end trial when it is time
            const end_trial = () => {
                // kill any remaining setTimeout handlers
                this.jsPsych.pluginAPI.clearAllTimeouts();
                // gather the data to store for the trial
                var trial_data = {
                    rt: response.rt,
                    stimulus: trial.stimulus,
                    response: response.buttons,
                    tests: response.tests,
                    trialTime: response.totalTime
                };
                // clear the display
                display_element.innerHTML = "";
                // move on to the next trial
                this.jsPsych.finishTrial(trial_data);
            };
            // hide image if timing is set
            if (trial.stimulus_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(() => {
                    display_element.querySelector("#jspsych-image-button-response-stimulus").style.visibility = "hidden";
                }, trial.stimulus_duration);
            }
            // end trial if time limit is set
            if (trial.trial_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(() => {
                    end_trial();
                }, trial.trial_duration);
            }
            else if (trial.response_ends_trial === false) {
                console.warn("The experiment may be deadlocked. Try setting a trial duration or set response_ends_trial to true.");
            }
        }
        simulate(trial, simulation_mode, simulation_options, load_callback) {
            if (simulation_mode == "data-only") {
                load_callback();
                this.simulate_data_only(trial, simulation_options);
            }
            if (simulation_mode == "visual") {
                this.simulate_visual(trial, simulation_options, load_callback);
            }
        }
        create_simulation_data(trial, simulation_options) {
            const default_data = {
                stimulus: trial.stimulus,
                rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true),
                response: this.jsPsych.randomization.randomInt(0, trial.choices.length - 1),
            };
            const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
            this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
            return data;
        }
        simulate_data_only(trial, simulation_options) {
            const data = this.create_simulation_data(trial, simulation_options);
            this.jsPsych.finishTrial(data);
        }
        simulate_visual(trial, simulation_options, load_callback) {
            const data = this.create_simulation_data(trial, simulation_options);
            const display_element = this.jsPsych.getDisplayElement();
            this.trial(display_element, trial);
            load_callback();
            if (data.rt !== null) {
                this.jsPsych.pluginAPI.clickTarget(display_element.querySelector(`div[data-choice="${data.response}"] button`), data.rt);
            }
        }
    }
    ImageButtonResponsePlugin.info = info;
  
    return ImageButtonResponsePlugin;
  
  })(jsPsychModule);
  