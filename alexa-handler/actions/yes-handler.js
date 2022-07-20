const intents = require('./intents');
const GC = require('../constants.json')

const YesHandler = (handlerInput) => {
    const { responseBuilder, attributesManager } = handlerInput;

    let sessionAttributes = attributesManager.getSessionAttributes();
    let contexts = sessionAttributes.contexts || []

    let speechText = `Sorry, I didn't get that can you repharse that!`;

    if(contexts.length > 0){
        let curContext = contexts[0];
        if( curContext === GC.CONTEXTS.SHOW_MENU) return intents.MainMenuHandler(handlerInput);    
    }

    return responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse()

}

module.exports = {
    YesHandler
}