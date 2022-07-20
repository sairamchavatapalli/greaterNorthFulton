const GC = require('../constants.json')

const HelpHandler = (handlerInput) => {

    const { responseBuilder, attributesManager } = handlerInput;

    let sessionAttributes = attributesManager.getSessionAttributes();

    let speechText = `The hindu temple of atlanta alexa skill gives you information about facilities, pooja materials, committes, priests and our events.
    Please try say "Alexa open main menu" to see our menu.`
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
    HelpHandler
}
