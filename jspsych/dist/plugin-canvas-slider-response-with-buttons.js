var jsPsychCanvasSliderResponseWithButtons = (function (jspsych) {
  'use strict';

  const info = {
      name: "canvas-slider-response-with-buttons",
      parameters: {
          /** The drawing function to apply to the canvas. Should take the canvas object as argument. */
          stimulus: {
              type: jspsych.ParameterType.FUNCTION,
              pretty_name: "Stimulus",
              default: undefined,
          },
          /** Sets the minimum value of the slider. */
          min: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Min slider",
              default: 0,
          },
          /** Sets the maximum value of the slider */
          max: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Max slider",
              default: 100,
          },
          /** Sets the starting value of the slider */
          slider_start: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Slider starting value",
              default: 50,
          },
          /** Sets the step of the slider */
          step: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Step",
              default: 1,
          },
          /** Array containing the labels for the slider. Labels will be displayed at equidistant locations along the slider. */
          labels: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Labels",
              default: [],
              array: true,
          },
          /** Width of the slider in pixels. */
          slider_width: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Slider width",
              default: null,
          },
          /** Label of the button to advance. */
          button_label: {
              type: jspsych.ParameterType.STRING,
              pretty_name: "Button label",
              default: "Continue",
              array: false,
          },
          /** If true, the participant will have to move the slider before continuing. */
          require_movement: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Require movement",
              default: false,
          },
          /** Any content here will be displayed below the slider */
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
          /** If true, trial will end when user makes a response. */
          response_ends_trial: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Response ends trial",
              default: true,
          },
          /** Array containing the height (first value) and width (second value) of the canvas element. */
          canvas_size: {
              type: jspsych.ParameterType.INT,
              array: true,
              pretty_name: "Canvas size",
              default: [200, 500],
          },
          /** Question prompt. */
          text_prompt: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Prompt",
              default: undefined,
          },
          /** Placeholder text in the response text box. */
          text_placeholder: {
              type: jspsych.ParameterType.STRING,
              pretty_name: "Placeholder",
              default: "",
          },
          /** The number of rows for the response text box. */
          text_rows: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Rows",
              default: 1,
          },
          /** The number of columns for the response text box. */
          text_columns: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Columns",
              default: 40,
          },
          /** Name of the question in the trial data. If no name is given, the questions are named Q0, Q1, etc. */
          text_name: {
              type: jspsych.ParameterType.STRING,
              pretty_name: "Question Name",
              default: "",
          },
          scale_label : {
            type: jspsych.ParameterType.STRING,
              pretty_name: "Scale Label",
              default: "",
          },
          hide_checkbox : {
            type: jspsych.ParameterType.BOOL,
            pretty_name: "Hide Checkbox",
            default: false,
          }
          
      },
  };
  /**
   * **canvas-slider-response**
   *
   * jsPsych plugin for displaying a canvas stimulus and getting a slider response
   *
   * @author Chris Jungerius (modified from Josh de Leeuw)
   * @see {@link https://www.jspsych.org/plugins/jspsych-canvas-slider-response/ canvas-slider-response plugin documentation on jspsych.org}
   */
  class CanvasSliderResponseWithButtonsPlugin {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {
          var html = '<div id="jspsych-canvas-slider-response-wrapper" style="margin: 100px 0px;">';

          html +=
              '<div id="jspsych-canvas-slider-response-stimulus">' +
                  '<canvas id="jspsych-canvas-stimulus" height="' +
                  trial.canvas_size[0] +
                  '" width="' +
                  trial.canvas_size[1] +
                  '"></canvas>' +
                  "</div>";
          html +=
              '<div class="jspsych-canvas-slider-response-container" style="position:relative; margin: 0 auto 3em auto; width:';
          if (trial.slider_width !== null) {
              html += trial.slider_width + "px;";
          }
          else {
              html += trial.canvas_size[1] + "px;";
          }
          html += '">';
          html +=
              '<input type="range" value="' +
                  trial.slider_start +
                  '" min="' +
                  trial.min +
                  '" max="' +
                  trial.max +
                  '" step="' +
                  trial.step +
                  '" style="width: 100%;" id="jspsych-canvas-slider-response-response"></input>';
          html += "<div>";
          for (var j = 0; j < trial.labels.length; j++) {
              var width = 100 / (trial.labels.length - 1);
              var left_offset = j * (100 / (trial.labels.length - 1)) - width / 2;
              html +=
                  '<div style="display: inline-block; position: absolute; left:' +
                      left_offset +
                      "%; text-align: center; width: " +
                      width +
                      '%;">';
              html += '<span style="text-align: center; font-size: 80%;">' + trial.labels[j] + "</span>";
              html += "</div>";
          }
          html += "</div>";
          html += "</div>";
          html += "</div>";

          html +=
                '<th><li style=" list-style-type:none; width:100%"><label class="jspsych-survey-likert-opt-label" id="checkbox-text" style="margin-left: 47%;"><input type="checkbox" name="Q" value="1" id="check"';
          html += ">" + trial.scale_label + "</label></li></th>";

          if (trial.prompt !== null) {
              html += trial.prompt;
          }

          // add text box 
          var question = trial.text_prompt;
          html +=
              '<div id="jspsych-survey-text class="jspsych-survey-text-question" style="margin: 2em 0em;">';
          html += '<p class="jspsych-survey-text" id="textbox-text">' + question + "</p>";
          var autofocus = "autofocus";
          html += '<textarea id="input-text" name="#jspsych-survey-text-response" data-name="' +
                          trial.text_name +
                          '" cols="' +
                          trial.text_columns +
                          '" rows="' +
                          trial.text_rows +
                          '" ' +
                          autofocus +
                          " " +
                          ' placeholder="' +
                          trial.text_placeholder +
                          '"></textarea>';

          // add submit button
          html +=
              '<button id="jspsych-canvas-slider-response-next" class="jspsych-btn" ' +
                  (trial.require_movement ? "disabled" : "") +
                  ">" +
                  trial.button_label +
                  "</button>";
          display_element.innerHTML = html;

          var response = {
              rt: null,
              response: null,
              slider_start: null,
              text_response: null,
              check: false
          };

          var text = document.getElementById("input-text");
          text.classList.add("hidden");
          var textDesc = document.getElementById("textbox-text");
          textDesc.classList.add("hidden");

          var check = document.getElementById("check");

          if(trial.hide_checkbox)
          {
            check.classList.add("hidden");
            var checktest = document.getElementById("checkbox-text");
            checktest.classList.add("hidden");
          }

          check.addEventListener("click", function()
          {
            var text = document.getElementById("input-text");
            var textDesc = document.getElementById("textbox-text");
            if (text.classList.contains("hidden"))
            {
              text.classList.remove("hidden");
              textDesc.classList.remove("hidden");
              response.check = true;

            }
            else
            {
              text.classList.add("hidden");
              textDesc.classList.add("hidden");
              response.check = false;
            }
          });

          // draw
          if (!typeof trial.stimulus === 'undefined')
          {
            let c = document.getElementById("jspsych-canvas-stimulus");
            trial.stimulus(c);
          }
          const end_trial = () => {
              this.jsPsych.pluginAPI.clearAllTimeouts();
              // save data
              var trialdata = {
                  rt: response.rt,
                  response: response.response,
                  slider_start: trial.slider_start,
                  text_response: response.text_response,
                  check: response.check
              };
              display_element.innerHTML = "";
              // next trial
              this.jsPsych.finishTrial(trialdata);
          };
          if (trial.require_movement) {
              const enable_button = () => {
                  display_element.querySelector("#jspsych-canvas-slider-response-next").disabled = false;
              };
              display_element
                  .querySelector("#jspsych-canvas-slider-response-response")
                  .addEventListener("mousedown", enable_button);
              display_element
                  .querySelector("#jspsych-canvas-slider-response-response")
                  .addEventListener("touchstart", enable_button);
              display_element
                  .querySelector("#jspsych-canvas-slider-response-response")
                  .addEventListener("change", enable_button);
          }
          display_element
              .querySelector("#jspsych-canvas-slider-response-next")
              .addEventListener("click", () => {
              // measure response time
              var endTime = performance.now();
              response.rt = Math.round(endTime - startTime);
              response.response = display_element.querySelector("#jspsych-canvas-slider-response-response").valueAsNumber;
              var q_element = document.getElementById("input-text");
              var val = q_element.value;         
              response.text_response = val;
              if (trial.response_ends_trial) {
                  end_trial();
              }
              else {
                  display_element.querySelector("#jspsych-canvas-slider-response-next").disabled = true;
              }
          });
          if (trial.stimulus_duration !== null) {
              this.jsPsych.pluginAPI.setTimeout(() => {
                  display_element.querySelector("#jspsych-canvas-slider-response-stimulus").style.visibility = "hidden";
              }, trial.stimulus_duration);
          }
          // end trial if trial_duration is set
          if (trial.trial_duration !== null) {
              this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
          }
          var startTime = performance.now();
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
              response: this.jsPsych.randomization.randomInt(trial.min, trial.max),
              rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true),
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
              const el = display_element.querySelector("input[type='range']");
              setTimeout(() => {
                  this.jsPsych.pluginAPI.clickTarget(el);
                  el.valueAsNumber = data.response;
              }, data.rt / 2);
              this.jsPsych.pluginAPI.clickTarget(display_element.querySelector("button"), data.rt);
          }
      }
  }
  CanvasSliderResponseWithButtonsPlugin.info = info;

  return CanvasSliderResponseWithButtonsPlugin;

})(jsPsychModule);
