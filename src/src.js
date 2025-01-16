"use strict";

//import * as utils from "./utils.js"
//import processData from "./saveData.js";

/**
 * A Trial aggregates the information needed to run a single judge-advisor system trial.
 */
class Trial 
{
    constructor(id, args = {}) 
    {
        for (let key in args) 
        {
            if (args.hasOwnProperty(key))
                this[key] = args[key];
        }

        this.id = id;
        this.scenarioID = typeof args.scenarioID === 'undefined'? null : args.scenarioID;
        this.trueCountry = typeof args.trueCondition === 'undefined'? null : args.trueCondition;
        this.trialInfoSet = typeof args.trialInfoSet === 'undefined'? {} : args.trialInfoSet;
        this.trialCost = typeof args.trialCost === 'undefined'? 0 : args.trialCost

    }
}

class Structure {

	/**
     * @constructor
     *
     * @param {Object} [args={}] - properties to assign to the Governor
     * @param {Trial[]} [args.trials=[]] - trial list
     * @param {int} [args.currentTrialIndex=0] - index of current trial in trial list
     * @param {string} [args.completionURL=''] - URL to which to refer participants for payment
     *
     */
	constructor(args = {}) 
	{
        this.numOfTrials = args.numOfTrials || 0;
        this.numOfSubtrials = args.numOfSubtrials || 0;
        this.currentTrialIndex = args.currentTrialIndex || 0;
        this.currentSubtrialIndex = args.currentSubtrialIndex || 0;
        this.completionURL = typeof args.completionURL === 'undefined'? '' : args.completionURL;
        this.timeStart = typeof args.timeStart === 'undefined' ? (new Date).getTime(): args.timeStart;
        this.scenarioObject = typeof args.scenarioObject === 'undefined'? [] : args.scenarioObject;
        this.participantID = typeof args.participantID === 'undefined'? "NO_ID" : args.participantID;
        this.feedback = typeof args.feedback === 'undefined'? false : args.feedback;
        this.corrects = typeof args.corrects === 'undefined'? [] : args.corrects;
        this.complete = typeof args.complete === 'undefined'? false : args.complete;
        this.expConditionOrder = typeof args.expConditionOrder === 'undefined' ? [] : args.expConditionOrder;
        this.trueConditions = [];
        this.difficulties = [];
        this.reasoning = [];
        this.feedbackElegible = [];
        this.feedbackGiven = [];
        this.differentials = [];
        this.trials = typeof args.scenarioObject === 'undefined' ? [] : Structure.addTrials(this.scenarioObject, this.numOfSubtrials*this.numOfTrials, this.expConditionOrder, this.numOfSubtrials, this.corrects);
    }

     /**
     * Upgrade stored trial details to genuine trials
     * @param {Object[]} trials - trials stored as JSON-compressed objects
     * @return {Trial[]} - trials expanded to be Trial objects
     */
    static addTrials(scenarioObject, len, expConditions, subtrials, corrects) 
    {
        let out = [];
        let trial = 1;
        let subtrial = 1;
        for(let i=0; i<len; i++) {
            out[i] = new Trial(i+1, {
                trialID: trial,
                subtrialID: subtrial,
            	scenarioID: scenarioObject[trial-1]["ID"], 
            	trueCountry: corrects[trial-1],
                expCondition: expConditions[trial-1],
                prompt: scenarioObject[trial-1]["Prompt"],  
                suspected: scenarioObject[trial-1]["Suspected"],  
                trialInfoSet: scenarioObject[trial-1]
            });
            subtrial++;
            if (subtrial > subtrials)
            {
                //this.trueConditions.push(scenarioObject[trial-1]["True Condition"]);
                trial++;
                subtrial=1;
            }
        }
        return out;
    }

    /**
     * @return {Trial} - the current trial
     */
    //get currentTrial() {return this.trials[this.currentTrialIndex];}

    /**
     * @return {Trial} - the current subtrial
     */
    get currentSubtrial() {return this.trials[this.currentSubtrialIndex];}

    /** Enable or disable fullscreen display
     * Adapted from: https://www.w3schools.com/howto/howto_js_fullscreen.asp
     * @param {boolean} [enter=true] - whether to enter fullscreen
     */
    fullscreenMode(enter = true) 
    {
        /* Get the documentElement (<html>) to display the page in fullscreen */
        let elem = document.documentElement;

        /* View in fullscreen */
        if(enter) {
            if (elem.requestFullscreen)
                elem.requestFullscreen();
            else if (elem.mozRequestFullScreen)  /* Firefox */
                elem.mozRequestFullScreen();
            else if (elem.webkitRequestFullscreen)  /* Chrome, Safari and Opera */
                elem.webkitRequestFullscreen();
            else if (elem.msRequestFullscreen) /* IE/Edge */
                elem.msRequestFullscreen();
        } else {
            // don't exit if we're not in fullscreen mode
            if(document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen)
                return;
            if (document.exitFullscreen)
                document.exitFullscreen();
            else if (document.mozCancelFullScreen)  /* Firefox */
                document.mozCancelFullScreen();
            else if (document.webkitExitFullscreen)  /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            else if (document.msExitFullscreen)  /* IE/Edge */
                document.msExitFullscreen();
        }
    }

    saveQuestionnaire(trial)
    {
        //this.storePluginData(trial);

        // let age = document.getElementById("input-0").value;
        // let gender = document.getElementById("input-1").value;
        // let medExp = document.getElementById("input-2").value;

        // let errorStyle = "style='color: red;position: absolute;left: 50%;transform: translate(-50%, -50%);top: 60%;'";
        // let ageError = document.querySelector('div.jspsych-content-wrapper').appendChild(document.createElement('div'));
        // ageError.innerHTML = "<div " + errorStyle + ">Please provide a valid age!</div>"
        // ageError.classList.add('hidden');

        // let expError = document.querySelector('div.jspsych-content-wrapper').appendChild(document.createElement('div'));
        // expError.innerHTML = "<div " + errorStyle + ">Please provide medical experience as a number!</div>"
        // expError.classList.add('hidden');

        // if (!(parseInt(age) > 0))
        // {
        //     ageError.classList.remove('hidden');
        //     return false;
        // }
        // else if (!(parseInt(medExp) > 0))
        // {
        //     expError.classList.remove('hidden');
        //     return false;
        // }
        // else
        // {
        //     this.demoQuestionnaire = trial.response;
        // }

        this.demoQuestionnaire = trial.response;
    }

    saveHypotheses(trial)
    {
        //this.storePluginData(trial);
        this.currentSubtrial.startingHypotheses = trial.response;
        this.currentSubtrial.hypothesisOptions = trial.question_order;
    }

    saveInfoSeeking(trial)
    {
        //this.storePluginData(trial);
        this.currentSubtrial.requestedInfo = trial.response;
        this.currentSubtrial.availableInfo = trial.tests;
        this.currentSubtrial.rts = trial.rt;
        this.currentSubtrial.totalInfoSeekingTime = trial.trialTime;
        this.currentSubtrial.totalSeekingDuration = trial.totalTestDuration;
    }

    saveDifficulty(trial)
    {
        this.difficulties.push(trial.response);
    }

    saveReasoningStrategy(trial)
    {
        this.reasoning.push(trial.response)
    }


    saveFeedbackStatus(trial)
    {
        this.feedbackGiven.push(trial.feedback_given);
        this.feedbackElegible.push(trial.elegible_for_feedback)
    }

    saveFinalDecision(trial)
    {
        //this.storePluginData(trial);
        this.currentSubtrial.finalDecision = trial.response;
        this.currentSubtrial.finalDecisionRT = trial.rt;
    }

    saveDifferentials(trial)
    {
        let trialID = this.currentSubtrial.trialID;
        let subtrialID = this.currentSubtrial.subtrialID;
        let idx = (subtrialID + ((trialID-1)*3))-1;
        // this.currentSubtrial.differentials = trial.response;
        // //this.currentSubtrial.severities = trial.scaleValues;
        // this.currentSubtrial.likelihoods = trial.sliderValues;
        // this.currentSubtrial.differentialRT = trial.rt;
        //this.trials[idx].differentials = trial.response;
        let diffs = trial.response;
        this.differentials[idx] = [];
        for (let i=0; i<diffs.length; i++)
        {
            this.differentials[idx].push(diffs[i]);
        }
        //this.differentials[idx] = trial.response;
        this.trials[idx].likelihoods = trial.sliderValues;
        this.trials[idx].differentialRT = trial.rt;

    }

    saveConfidence(trial)
    {
        //this.storePluginData(trial);
        this.currentSubtrial.confidence = trial.response;
        //this.currentSubtrial.treatmentPlan = trial.text_response;
        //this.currentSubtrial.readyToTreat = trial.checkbox;
        this.currentSubtrialIndex = this.currentSubtrialIndex + 1;
        //if (this.currentSubtrialIndex > this.numOfSubtrials)
        //{
        //    this.currentTrialIndex++;
            //this.currentSubtrialIndex = 0;
        //}
        if (this.currentSubtrialIndex > (this.numOfTrials*this.numOfSubtrials))
        {
            this.complete = true;
        }
    }

    save

    saveDebrief(trial)
    {
        this.debrief = trial.response;
    }

    saveDecisionQuestions(trial)
    {
        this.decisionQuestions = trial.question_order;
        this.decisionAnswers = trial.response;
    }

    saveBigFiveQuestions(trial)
    {
        this.bigFiveQuestions = trial.question_order;
        this.bigFiveAnswers = trial.response;
    }

    // getConditions()
    // {
    //     let intro = "<p>Thank you again for participating in our experiment! You have now completed all patient cases!</p>"
    //     return this.trueConditions;
    // }

    getCaseIntro()
    {
        let currentExpCondition = this.currentSubtrial.expCondition;
        let prompt = this.currentSubtrial.prompt;
        if (currentExpCondition == "Directed")
        {
            prompt = prompt + " " + this.currentSubtrial.suspected;
        }
        return prompt;
    }

    showCaseNumber()
    {
        let currentCase = this.currentSubtrial.trialID;
        let text = "You are now on trial " + currentCase + " of " + this.numOfTrials + ": ";
        text = text + this.currentSubtrial.prompt;
        let content = document.getElementById("jspsych-content");
        let p = document.createElement("p");
        p.innerHTML = text;
        content.prepend(p);
    }

    processData(data) 
    {
        // Data about the participant
        let participantData = {
            id: data.participantID,
            feedbackGroup: data.feedback,
            numOfScenarios: data.numOfTrials,
            completionCheck: data.complete,
            scenarioOrder: data.order,
            hypothesisCondition: data.condition,
            timeStart: data.timeStart,
            timeEnd: data.timeEnd,
            experimentDuration: data.timeEnd - data.timeStart
        };

        // Questionnaires
        let questionnaireData = [];
        if(typeof data.demoQuestionnaire !== 'undefined')
            for (let q=0; q<data.demoQuestionnaire.length; q++)
                if(data.demoQuestionnaire[q])
                {
                    questionnaireData.push(data.demoQuestionnaire[q])
                }
        participantData.demoQuestionnaire = questionnaireData;

        // Trials
        let trialData = [];
        for (let t=0; t<this.currentSubtrialIndex; t++)
            trialData.push(this.flattenTrialData(data.trials[t], participantData.id, data.feedback, t)); // could be feedback group
        participantData.trials = trialData;

        // Debrief stuff
        participantData.debrief = data.debrief;
        // if(typeof data.debrief !== 'undefined') {
        //     if(data.debrief)
        //     {
        //         participantData.debrief = this.flattenDebriefData(data.debrief, participantData.id);
        //     }
        // }

        return participantData;
    }

    /** Return a trial squeezed into a format suitable for saving as .csv
     * @param {Trial} trial - trial object to squeeze
     * @param {int} id - id of the participant (inserted as first column)
     * @param {boolean} feedbackGroup - whether participant is in the feedbak group
     * @returns {Object} - slim representation of trial object
     */
    flattenTrialData(trial, id, feedbackGroup, trialNum) 
    {
        let out = {};
        out.trial = trial.trialID;
        out.subtrial = trial.subtrialID;
        out.participantID = id;
        out.feedback = feedbackGroup;
        out.scenarioID = trial.id;
        out.trueCountry = this.corrects[trialNum];
        out.expCondition = trial.expCondition
        if (trial.expCondition == "Generation")
        {
            out.startingHypotheses = trial.startingHypotheses;
            out.numOfStartingHypotheses = trial.startingHypotheses.length;
            out.hypothesisOptions = trial.hypothesisOptions;
        }
        out.requestedInfoIdxs = trial.requestedInfo;
        out.requestedInfoText = (trial.requestedInfo).map(i => trial.availableInfo[i-1])
        out.numOfRequestedInfo = trial.requestedInfo.length;
        out.availableInfo = trial.availableInfo;
        out.rts = trial.rts;
        out.totalInfoSeekingTime = trial.totalInfoSeekingTime;
        out.totalInfoDuration = trial.totalInfoDuration;
        out.differentials = this.differentials[trialNum];
        //out.severities = trial.severities;
        out.likelihoods = trial.likelihoods;
        out.differentialRT = trial.differentialRT;
        out.confidence = trial.confidence;
        //out.correct = out.trueCondition == out.finalDiagnosis ? 1 : 0;
        out.difficulty = this.difficulties[trialNum];
        out.reasoning = this.reasoning[trialNum];
        out.feedbackElegible = trial.feedback_given;
        out.elegibleForFeedback = trial.elegible_for_feedback;
        
        //let treatment = trial.treatmentPlan;
        //if (!treatment || treatment.length === 0 )
        //{
        //    out.treatmentPlan = "Not Provided";
        //}
        //else
        //{
         //   out.treatmentPlan = trial.treatmentPlan;
        //}

        return out;
    }

    /**
     * Loop through the keys in all objects in data and pad each object to contain all keys (pad with null)
     * @param {Object[]} data debrief questions
     * @param {int} id participant id
     * @return {Object[]}
     */
    flattenDebriefData(data, id) {
        // List keys
        let keys = [];
        data.forEach(function(q) {
            Object.keys(q).forEach(function(key) {
                if(q.hasOwnProperty(key) && keys.indexOf(key) === -1)
                    keys.push(key);
            });
        });

        // Pad missing keys with null
        data.forEach(function(q) {
            q.participantId = id;
            q.id = data.indexOf(q);
            keys.forEach((k)=>{if(typeof q[k] === 'undefined') q[k] = null})
        });

        return data;
    }

    /**
     * Compile the data in this governor ready for sending, including a processed form
     * @return {Object} a JSON object with JSON strings containing rawData and processedData
     */
    compileSelf() 
    {
        return {
	        id: this.participantID,
            rawData: JSON.stringify(this),
            processedData: JSON.stringify(this.processData(this))
        }
    }

    authenticate(datum) 
    {
        try
        {
            fetch("./saveJSONerr.php",
            {method: "POST", body: datum});
        }
        catch(e)
        {
            console.log(e);
            let err = 'JS - Caught exception: ' + e;
                        fetch("../errorSave.php",
            {method: "POST", body: datum});
        }
    }


    /**
     * Send all the data in the governor object to a backend which will save it to a file.
     */
    exportGovernor() 
    {
        let ask = new XMLHttpRequest();
        ask.open('POST', './saveJSONerr.php', true);
        ask.onreadystatechange = function() {
            if (this.readyState===4 && this.status===200) {
                let text = "";
                try {
                    text = JSON.parse(this.responseText);
                } catch(e) {
                    text = this.responseText;
                }
            }
        };
        ask.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //let info = encodeURI('data='+JSON.stringify(this.compileSelf()));
        let info = JSON.stringify(this.compileSelf());
        //let bla = decodeURI(info).substr(5);
        //ask.send(info);
        this.authenticate(info);
    }

        /**
     * Save the data sent from the plugin in the Trial object
     *
     * @param {Object} pluginData - response data sent by a jsPsych plugin
     */
    storePluginData(pluginData) {
        if (Object.keys(this.currentSubtrial).indexOf('pluginResponse') === -1)
            this.currentSubtrial.pluginResponse = [];
        // Save this trial data (jspsych would do this for us, but we have access to a bunch of stuff it doesn't
        this.currentSubtrial.pluginResponse.push(pluginData);
    }
}
