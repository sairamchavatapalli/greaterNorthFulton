const intents = require('./intents');
const GC = require('../constants.json')

const GoBackHandler = (handlerInput, arguments) => {
    const { responseBuilder, attributesManager } = handlerInput;

    let sessionAttributes = attributesManager.getSessionAttributes();
    let contexts = sessionAttributes.contexts || []
    let repromptText = ' What do you want to do';
    let speechText = `Sorry, The command not available for this screen. Please try some other or say "help" for help!`;

    if (contexts.length > 0) {
        let curContext = contexts[0];
        if (curContext === GC.CONTEXTS.SHOW_VAHANA_SEVA ) return intents.MainMenuHandler(handlerInput);

    }

    speechText += repromptText

    return responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .getResponse()
}

module.exports = {
    GoBackHandler
}