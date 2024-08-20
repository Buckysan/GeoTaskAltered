var jsPsychSurveyMultiSelectLimitSliders = (function (jspsych) {
  'use strict';

  const info = {
      name: "survey-multi-select-limit-sliders",
      parameters: {
          /** Array containing one or more objects with parameters for the question(s) that should be shown on the page. */
          questions: {
              type: jspsych.ParameterType.COMPLEX,
              array: true,
              pretty_name: "Questions",
              nested: {
                  /** Question prompt. */
                  prompt: {
                      type: jspsych.ParameterType.HTML_STRING,
                      pretty_name: "Prompt",
                      default: undefined,
                  },
                  /** Array of multiple select options for this question. */
                  options: {
                      type: jspsych.ParameterType.STRING,
                      pretty_name: "Options",
                      array: true,
                      default: undefined,
                  },
                  /** If true, then the question will be centered and options will be displayed horizontally. */
                  horizontal: {
                      type: jspsych.ParameterType.BOOL,
                      pretty_name: "Horizontal",
                      default: false,
                  },
                  // The limit to the number of checkboxes selected.
                  limit: {
                    type: jspsych.ParameterType.INT,
                    pretty_name: "Limit",
                    default: 1,
                  },
                  /** Whether or not a response to this question must be given in order to continue. */
                  required: {
                      type: jspsych.ParameterType.BOOL,
                      pretty_name: "Required",
                      default: false,
                  },
                  /** Name of the question in the trial data. If no name is given, the questions are named Q0, Q1, etc. */
                  name: {
                      type: jspsych.ParameterType.STRING,
                      pretty_name: "Question Name",
                      default: "",
                  },
              },
          },
          /** If true, the order of the questions in the 'questions' array will be randomized. */
          randomize_question_order: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Randomize Question Order",
              default: false,
          },
          /** HTML-formatted string to display at top of the page above all of the questions. */
          preamble: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Preamble",
              default: null,
          },
          /** Message that will be displayed if one or more required questions is not answered. */
          required_message: {
              type: jspsych.ParameterType.STRING,
              pretty_name: "Required message",
              default: "You must choose at least one response for this question",
          },
          /** Setting this to true will enable browser auto-complete or auto-fill for the form. */
          autocomplete: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Allow autocomplete",
              default: false,
          },
          //////////////////////////////////////////////////////
          // Slider Parameters
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
              array: true,
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
              default: [500, 500],
          }
      },
  };

  function selectiveCheck (event) {
    var checkedChecks = document.querySelectorAll("input[type=checkbox]");
    if (checkedChecks.length >= trial.limit + 1)
      return false;
  }
  /**
   * **survey-multi-select-limit-sliders**
   *
   * jsPsych plugin for presenting multiple choice survey questions with the ability to respond limit options and
   * then report confidence in each.
   *
   * @see {@link https://www.jspsych.org/plugins/jspsych-survey-multi-select/ survey-multi-select plugin documentation on jspsych.org}
   */
  class SurveyMultiSelectLimitSlidersPlugin {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {
          let stage = 1;
          var plugin_id_name = "jspsych-survey-multi-select";
          var plugin_id_selector = "#" + plugin_id_name;
          const _join = (...args) => args.join("-");
          // inject CSS for trial
          var cssstr = ".jspsych-survey-multi-select-question { margin-top: 2em; margin-bottom: 2em; text-align: left; }" +
              ".jspsych-survey-multi-select-text span.required {color: darkred;}" +
              ".jspsych-survey-multi-select-horizontal .jspsych-survey-multi-select-text {  text-align: center;}" +
              ".jspsych-survey-multi-select-option { line-height: 2; }" +
              ".jspsych-survey-multi-select-horizontal .jspsych-survey-multi-select-option {  display: inline-block;  margin-left: 1em;  margin-right: 1em;  vertical-align: top;}" +
              "label.jspsych-survey-multi-select-text input[type='checkbox'] {margin-right: 1em;}";
          display_element.innerHTML =
              '<style id="jspsych-survey-multi-select-css">' + cssstr + "</style>";
          // form element
          var trial_form_id = _join(plugin_id_name, "form");
          display_element.innerHTML += '<form id="' + trial_form_id + '"></form>';
          var trial_form = display_element.querySelector("#" + trial_form_id);
          if (!trial.autocomplete) {
              trial_form.setAttribute("autocomplete", "off");
          }
          // show preamble text
          var preamble_id_name = _join(plugin_id_name, "preamble");
          if (trial.preamble !== null) {
              trial_form.innerHTML +=
                  '<div id="' +
                      preamble_id_name +
                      '" class="' +
                      preamble_id_name +
                      '">' +
                      trial.preamble +
                      "</div>";
          }
          // generate question order. this is randomized here as opposed to randomizing the order of trial.questions
          // so that the data are always associated with the same question regardless of order
          var question_order = [];
          for (var i = 0; i < trial.questions.length; i++) {
              question_order.push(i);
          }
          if (trial.randomize_question_order) {
              question_order = this.jsPsych.randomization.shuffle(question_order);
          }
          // add multiple-select questions
          for (var i = 0; i < trial.questions.length; i++) {
              var question = trial.questions[question_order[i]];
              var question_id = question_order[i];
              // create question container
              var question_classes = [_join(plugin_id_name, "question")];
              if (question.horizontal) {
                  question_classes.push(_join(plugin_id_name, "horizontal"));
              }
              trial_form.innerHTML +=
                  '<div id="' +
                      _join(plugin_id_name, question_id) +
                      '" data-name="' +
                      question.name +
                      '" class="' +
                      question_classes.join(" ") +
                      '"></div>';
              var question_selector = _join(plugin_id_selector, question_id);
              // add question text
              display_element.querySelector(question_selector).innerHTML +=
                  '<p id="survey-question" class="' +
                      plugin_id_name +
                      '-text survey-multi-select">' +
                      question.prompt +
                      "</p>";
              // create option check boxes
              let numOfOptions = trial.limit;
              let numOfSelected = 0;
              for (var j = 0; j < question.options.length; j++) {
                  var option_id_name = _join(plugin_id_name, "option", question_id, j);
                  // add check box container
                  display_element.querySelector(question_selector).innerHTML +=
                      '<div id="' + option_id_name + '" class="' + _join(plugin_id_name, "option") + '"></div>';
                  // add label and question text
                  var form = document.getElementById(option_id_name);
                  var input_name = _join(plugin_id_name, "response", question_id);
                  var input_id = _join(plugin_id_name, "response", question_id, j);
                  var label = document.createElement("label");
                  label.setAttribute("class", plugin_id_name + "-text");
                  label.innerHTML = question.options[j];
                  label.setAttribute("for", input_id);
                  // create checkboxes
                  var input = document.createElement("input");
                  input.setAttribute("type", "checkbox");
                  input.setAttribute("name", input_name);
                  input.setAttribute("id", input_id);
                  input.setAttribute("value", question.options[j]);
                  form.appendChild(label);
                  label.insertBefore(input, label.firstChild);
              }
          }
          // add submit button
          trial_form.innerHTML += '<div class="fail-message"></div>';
          trial_form.innerHTML +=
              '<button id="' +
                  plugin_id_name +
                  '-next" class="' +
                  plugin_id_name +
                  ' jspsych-btn">' +
                  trial.button_label +
                  "</button>";
          // validation check on the data first for custom validation handling
          // then submit the form
          display_element
              .querySelector("#jspsych-survey-multi-select-next")
              .addEventListener("click", () => {
              for (var i = 0; i < trial.questions.length; i++) {
                  if (trial.questions[i].required) {
                      if (display_element.querySelector("#jspsych-survey-multi-select-" + i + " input:checked") == null) {
                          display_element
                              .querySelector("#jspsych-survey-multi-select-" + i + " input")
                              .setCustomValidity(trial.required_message);
                      }
                      else {
                          display_element
                              .querySelector("#jspsych-survey-multi-select-" + i + " input")
                              .setCustomValidity("");
                      }
                  }
              }
              trial_form.reportValidity();
          });
          let errorStyle = "style='color: red;position: absolute;left: 50%;transform: translate(-50%, -50%);top: 80%;'";
          let advError = document.querySelector('div.jspsych-content-wrapper').appendChild(document.createElement('div'));
          advError.innerHTML = "<div " + errorStyle + ">Please provide exactly " + trial.limit + " diagnoses" + "</div>";
          advError.classList.add('hidden');
          var question_data = {};
          var answers;
          trial_form.addEventListener("submit", (event) => {
              if (stage == 1)
              {
                  event.preventDefault();
                // measure response time
                var endTime = performance.now();
                var response_time = Math.round(endTime - startTime);
                // create object to hold responses
                for (var index = 0; index < trial.questions.length; index++) {
                    var match = display_element.querySelector("#jspsych-survey-multi-select-" + index);
                    var val = [];
                    var inputboxes = match.querySelectorAll("input[type=checkbox]:checked");
                    for (var j = 0; j < inputboxes.length; j++) {
                        var currentChecked = inputboxes[j];
                        val.push(currentChecked.value);
                    }
                    var id = "Q" + index;
                    var obje = {};
                    var name = id;
                    if (match.attributes["data-name"].value !== "") {
                        name = match.attributes["data-name"].value;
                    }
                    obje[name] = val;
                    answers = val;
                    Object.assign(question_data, obje);
                    if (val.length == 0) ;
                }

                if (answers.length !== trial.limit)
                {
                  advError.classList.remove('hidden');
                  return false;
                }

                else
                {
                  advError.remove();
                  // save data
                  var trial_data = {
                      rt: response_time,
                      response_answers: answers,
                      question_order: question_order,
                  };
                  display_element.innerHTML = "";

                  ///// Start sliders

                  var numOfSliders = trial.limit;
                  let html = "";
                  html += trial.prompt;
                  let slider_prompts = answers;
                  for (var x = 0; x < numOfSliders;x++)
                  {
                      var vmargin = 100;
                      html += '<div id="jspsych-canvas-slider-response-wrapper-' + (x+1) + '"style="margin:' + vmargin + 'px 0px;">';
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
                              '" style="width: 100%;" class="jspsych-canvas-slider-response-response" id="jspsych-canvas-slider-response-response-' + (x+1) + '"></input>';
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
                      if (trial.prompt !== null) {
                          html += slider_prompts[x];
                      }
                  }
                  // add submit button
                    html +=
                        '<button id="jspsych-canvas-slider-response-next" class="jspsych-btn" ' +
                            (trial.require_movement ? "disabled" : "") +
                            ">" +
                            trial.button_label +
                            "</button>";
                    display_element.innerHTML = html;

                    stage ++;

                    display_element
                       .querySelector("#jspsych-canvas-slider-response-next")
                       .addEventListener("click", () => {
                        if (stage == 2)
                        {
                          // measure response time
                          var endTime = performance.now();
                          response.rt_conf = Math.round(endTime - startTime);
                          var l = trial.limit;
                          response.response_confidence = [];
                          for (i = 0; i < l; i++)
                          {
                            let ele =  "#jspsych-canvas-slider-response-response-" + (i+1)
                            var slider = display_element.querySelector(ele)
                            response.response_confidence.push(slider.valueAsNumber)
                          }
                          if (trial.response_ends_trial) {
                              end_trial();
                          }
                          else {
                              display_element.querySelector("#jspsych-canvas-slider-response-next").disabled = true;
                          }
                        }
                  });

                }
              }
          });
          var startTime = performance.now();
          // draw
          if (!typeof trial.stimulus === 'undefined')
          {
            let c = document.getElementById("jspsych-canvas-stimulus");
            trial.stimulus(c);
          }
          var response = {
              rt_ans: null,
              rt_conf: null,
              response_answers: null,
              response_confidence: null

          };
          const end_trial = () => {
              this.jsPsych.pluginAPI.clearAllTimeouts();
              // save data
              var trialdata = {
                  rt_ans: response.rt_ans,
                  rt_conf: response.rt_conf,
                  response_answers: response.response_answers,
                  response_confidence: response.response_confidence,
                  slider_start: trial.slider_start
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
          const question_data = {};
          let rt = 1000;
          for (const q of trial.questions) {
              let n_answers;
              if (q.required) {
                  n_answers = this.jsPsych.randomization.randomInt(1, q.options.length);
              }
              else {
                  n_answers = this.jsPsych.randomization.randomInt(0, q.options.length);
              }
              const name = q.name ? q.name : `Q${trial.questions.indexOf(q)}`;
              const selections = this.jsPsych.randomization.sampleWithoutReplacement(q.options, n_answers);
              question_data[name] = selections;
              rt += this.jsPsych.randomization.sampleExGaussian(1500, 400, 1 / 200, true);
          }
          const default_data = {
              response: question_data,
              rt: rt,
              question_order: trial.randomize_question_order
                  ? this.jsPsych.randomization.shuffle([...Array(trial.questions.length).keys()])
                  : [...Array(trial.questions.length).keys()],
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
          const answers = Object.entries(data.response);
          for (let i = 0; i < answers.length; i++) {
              for (const a of answers[i][1]) {
                  this.jsPsych.pluginAPI.clickTarget(display_element.querySelector(`#jspsych-survey-multi-select-response-${i}-${trial.questions[i].options.indexOf(a)}`), ((data.rt - 1000) / answers.length) * (i + 1));
              }
          }
          this.jsPsych.pluginAPI.clickTarget(display_element.querySelector("#jspsych-survey-multi-select-next"), data.rt);
      }
  }
  SurveyMultiSelectLimitSlidersPlugin.info = info;

  return SurveyMultiSelectLimitSlidersPlugin;

})(jsPsychModule);
