const GC = require('../constants.json')

const BusinessDevelopmentHandler = (handlerInput) => {

    const { responseBuilder, attributesManager } = handlerInput;

    let sessionAttributes = attributesManager.getSessionAttributes();

    let speechText = `Okay, we have types of business resources, workforces and programs. Please visit our website for more details`
    let repromptText = ' What do you want to do';

    sessionAttributes.repeatSpeech = speechText

    attributesManager.setSessionAttributes(sessionAttributes);
    speechText += repromptText

    return responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .getResponse()

}

module.exports = {
    BusinessDevelopmentHandler
}
