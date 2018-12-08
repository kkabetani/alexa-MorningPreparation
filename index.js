"use strict";

const Alexa = require('ask-sdk-core');

const HandkerchiefColor = new Map([
    [0, "休み"],    // 日
    [1, "ピンク"],  // 月
    [2, "青"],      // 火
    [3, "ピンク"],  // 水
    [4, "青"],      // 木
    [5, "ピンク"],  // 金
    [6, "休み"]     // 土
]);

const HandkerchiefIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'HandkerchiefIntent';
    },
    handle(handlerInput) {
        const d = new Date().getDay();
        const speechOutput = '今日は' + HandkerchiefColor.get(d) + 'です';

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    },
};

const HelpHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest'
            || (request.type == 'IntentRequest'
                && request.intent.name === 'AMAZON.HelpIntent');
    },
    handle(handlerInput) {
        const speechOutput = '朝の準備を教えてくれます。';
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        HandkerchiefIntentHandler,
        HelpHandler
    )
    .lambda();