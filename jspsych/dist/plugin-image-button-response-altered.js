//This image button response code has been modified so that multiple 'choice' buttons must be pressed before the end button

var jsPsychImageButtonResponseAltered = (function (jspsych) {
    'use strict';
  
    const info = {
        name: "image-button-response",
        parameters: {
            stimulus: {
                type: jspsych.ParameterType.IMAGE,
                pretty_name: "Stimulus",
                default: undefined,
            },
            choices: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Choices",
                default: undefined,
                array: true,
            },
            prompt: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Prompt",
                default: null,
            },
            stimulus_height: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Image height",
                default: null,
            },
            stimulus_width: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Image width",
                default: null,
            },
            maintain_aspect_ratio: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Maintain aspect ratio",
                default: true,
            },
            button_html: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Button html",
                default: '<button class="jspsych-btn">%choice%</button>',
                array: true,
            },
            button_delay: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Button delay",
                default: 0,
            },
            shuffle_buttons: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Shuffle buttons",
                default: false,
            },
            scenarioObject: {
                type: jspsych.ParameterType.OBJECT,
                pretty_name: "Scenario Object",
                default: undefined,
            },
            response_ends_trial: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Response ends trial",
                default: true,
            },
            trial_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Trial duration",
                default: null,
            },
            stimulus_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Stimulus duration",
                default: null,
            },
            margin_vertical: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Margin vertical",
                default: "0px",
            },
            margin_horizontal: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Margin horizontal",
                default: "8px",
            },
            endButton: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "End Button",
                default: "Enter Answers",
            },
            required_clicks: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Required Clicks",
                default: 1,
            },
        },
    };
  
    class ImageButtonResponsePlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }
        trial(display_element, trial) {
            // Display stimulus
            var html = '<div id="jspsych-image-button-response-stimulus">';
            html += '<img src="' + trial.stimulus + '" id="jspsych-image-button-response-stimulus-image" style="';
            if (trial.stimulus_height !== null) {
                html += "height:" + trial.stimulus_height + "px; ";
                if (trial.stimulus_width == null && trial.maintain_aspect_ratio) {
                    html += "width: auto; ";
                }
            }
            if (trial.stimulus_width !== null) {
                html += "width:" + trial.stimulus_width + "px; ";
                if (trial.stimulus_height == null && trial.maintain_aspect_ratio) {
                    html += "height: auto; ";
                }
            }
            html += '"></img>';
            html += "</div>";
  
            // Display buttons
            var buttons = [];
            if (Array.isArray(trial.button_html)) {
                if (trial.button_html.length == trial.choices.length) {
                    buttons = trial.button_html;
                } else {
                    console.error("Error in image-button-response plugin. The length of the button_html array does not equal the length of the choices array");
                }
            } else {
                for (var i = 0; i < trial.choices.length; i++) {
                    buttons.push(trial.button_html);
                }
            }
            if (trial.shuffle_buttons) {
                let array = trial.choices;
                let counter = array.length;
                while (counter > 0) {
                    let index = Math.floor(Math.random() * counter);
                    counter--;
                    let temp = array[counter];
                    array[counter] = array[index];
                    array[index] = temp;
                }
                trial.choices = array;
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
  
            if (trial.prompt !== null) {
                html += trial.prompt;
            }
  
            display_element.innerHTML = html;
  
            // start timing
            var start_time = performance.now();
            let count = 1;
  
            // store response
            var response = {
                rt: [],
                buttons: [],
                tests: [],
                totalTime: null,
                totalTestDuration: 0,
            };
  
            // Ensure required number of choices are clicked
            let choicesClicked = new Array(trial.choices.length).fill(false);
            let requiredClicks = trial.required_clicks;
            let clicksMade = 0;
  
            for (var i = 0; i < trial.choices.length; i++) {
                let button = display_element.querySelector("#jspsych-image-button-response-button-" + i);
                button.addEventListener("click", (e) => {
                    var btn_el = e.currentTarget;
                    var choice = btn_el.getAttribute("data-choice");
                    var txt = btn_el.textContent || btn_el.innerText;
  
                    if (!choicesClicked[choice]) {
                        choicesClicked[choice] = true;
                        clicksMade++;
                    }
  
                    // Proceed with nested button logic or ending trial logic
                    if (txt == trial.endButton) {
                        if (clicksMade >= requiredClicks) { // Check if required number of choices are clicked
                            var end_time = performance.now();
                            var rt = Math.round(end_time - start_time);
                            response.totalTime = parseInt(rt);
                            end_trial();
                        } else {
                            alert(`Please make sure to consider viewing information before submitting your guesses.`);
                        }
                    } else {
                        // Nested button logic
                        let testObject = trial.scenarioObject[txt];
                        let divGroup;
                        let canvas = document.querySelector("#jspsych-content");
  
                        if (typeof document.querySelector("#jspsych-image-button-response-btngrouplevel2" === 'undefined')) {
                            divGroup = canvas.appendChild(document.createElement('div'));
                            divGroup.id = "jspsych-image-button-response-btngrouplevel2";
                        } else {
                            divGroup = document.querySelector("#jspsych-image-button-response-btngrouplevel2");
                        }
  
                        let entries = Object.entries(testObject);
                        if(trial.shuffle_buttons) {
                            let array = entries;
                            let counter = array.length;
                            while (counter > 0) {
                                let index = Math.floor(Math.random() * counter);
                                counter--;
                                let temp = array[counter];
                                array[counter] = array[index];
                                array[index] = temp;
                            }
                            entries = array;
                        }
  
                        for (const [innerkey, value] of entries) {
                            let btnDiv = divGroup.appendChild(document.createElement("div"));
                            btnDiv.className = "jspsych-image-button-response-button-level2";
                            btnDiv.id = "jspsych-image-button-response-button-level2-" + count;
                            let innerBtn = btnDiv.appendChild(document.createElement("button"));
                            innerBtn.innerHTML = innerkey;
                            innerBtn.id = "Test" + (innerkey.replace(/\s/g, ''));
                            innerBtn.className = "jspsych-btn"
                            innerBtn.value = count;
                            innerBtn.style = "display: inline-block; margin:7px 8px";
                            response.tests.push(innerkey);
                            innerBtn.addEventListener("click", (e) => {
                                if (canvas.querySelector('#currentRes') != null) {
                                    canvas.querySelector('#currentRes').remove();
                                }
  
                                response.buttons.push(innerBtn.value);
                                let timeNow = performance.now();
                                var rt = Math.round(timeNow - start_time);
                                response.rt.push(parseInt(rt));
                                let output = testObject[innerkey]["Output"];
                                let duration = testObject[innerkey]["Duration"];
                                response.totalTestDuration = response.totalTestDuration + duration;
                                if (output.includes(".jpg")) {
                                    let testRes = innerBtn.appendChild(document.createElement("img"));
                                    testRes.src = "./assets/" + output;
                                    testRes.style = "height: 30em; width: 50em";
                                    testRes.id = "currentRes";
                                } else {
                                    if (trial.button_delay == 0) {
                                        let testRes = innerBtn.appendChild(document.createElement("p"));
                                        testRes.innerHTML = output
                                        testRes.id = "currentRes";
                                        testRes.style = "color: blue;";
                                    } else {
                                        let loading = innerBtn.appendChild(document.createElement("img"));
                                        loading.id = "loading";
                                        loading.src = "./assets/loading.gif";
                                        loading.style = "height: 2em; width: 2em";
                                        setTimeout(function() {
                                            var canvas = document.querySelector('#jspsych-content');
                                            canvas.querySelector('#loading').remove();
                                            let testRes = innerBtn.appendChild(document.createElement("p"));
                                            testRes.innerHTML = output
                                            testRes.id = "currentRes";
                                            testRes.style = "color: blue;";
                                        }, trial.button_delay);
                                    }
                                }
                            });
                            count = count + 1;
                        }
                    }
                });
            }
  
            // function to end trial when it is time
            const end_trial = () => {
                this.jsPsych.pluginAPI.clearAllTimeouts();
                var trial_data = {
                    rt: response.rt,
                    stimulus: trial.stimulus,
                    response: response.buttons,
                    tests: response.tests,
                    trialTime: response.totalTime
                };
                display_element.innerHTML = "";
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
            } else if (trial.response_ends_trial === false) {
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
  