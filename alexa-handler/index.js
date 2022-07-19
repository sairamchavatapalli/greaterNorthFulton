const Alexa = require('ask-sdk-core');
const { ExpressAdapter } = require('ask-sdk-express-adapter');

const interceptors = require('./interceptors');
const actionMap = require('./action-mapper');

const callAction = (handlerInput, intent) => {
    let action = actionMap.get(intent);
    return action(handlerInput)
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest";
    },
    handle(handlerInput) {
        let intent = Alexa.getRequestType(handlerInput.requestEnvelope)
        return callAction(handlerInput, intent)
    }
}

const IntentRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
    },
    handle(handlerInput) {
        let intent = Alexa.getIntentName(handlerInput.requestEnvelope)
        return callAction(handlerInput, intent)
    }
}

const TouchIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent';
    },
    handle(handlerInput) {
        let intent = Alexa.getRequestType(handlerInput.requestEnvelope)
        return callAction(handlerInput, intent)
    }
};


/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        let request = handlerInput.requestEnvelope.request;
        console.log(`~~~~ Session ended REASON: ${request.reason} ERROR ${request.error} MESSAGE: ${request.error && request.error.message || ''} `);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = handlerInput.t('ERROR_MSG');
        console.log(`~~~~ Error handled: ${error}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SystemExceptionHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'System.ExceptionEncountered';
    },
    handle(handlerInput) {
        console.log(`System exception encountered: ${handlerInput.requestEnvelope.request.reason}`);
    },
};

let skill = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        IntentRequestHandler,
        TouchIntentHandler,
        SystemExceptionHandler,
        SessionEndedRequestHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        interceptors.LoggingRequestInterceptor,
        interceptors.LocalisationRequestInterceptor,
        interceptors.interfaceSupportInterceptor)
    .addResponseInterceptors(
        interceptors.LoggingResponseInterceptor)


if (process.env.ENV_TYPE === 'local') {
    skill = skill.create();
    const adapter = new ExpressAdapter(skill, false, false);
    module.exports = adapter
}
else {
    module.exports.handler = skill.lambda()
}