const intents = require('./intents');
const GC = require('../constants.json')

const GoBackHandler = (handlerInput) => {
    const { responseBuilder, attributesManager } = handlerInput;

    let sessionAttributes = attributesManager.getSessionAttributes();
    let contexts = sessionAttributes.contexts || []
    let repromptText = ' What do you want to do';
    let speechText = `Sorry, The command not available for this screen. Please try some other or say "help" for help!`;

    if (contexts.length > 0) {
        let curContext = contexts[0];
        console.log('curContext', curContext)
        if (curContext === GC.CONTEXTS.MEMBERSHIP || curContext === GC.CONTEXTS.ABOUT_CHAMBER) return intents.MainMenuHandler(handlerInput);
        else if (curContext === GC.CONTEXTS.MEMBER_BENEFIT || curContext === GC.CONTEXTS.MEMBERSHIP_LEVEL) return intents.MemberShipHandler(handlerInput);
        else if (curContext === GC.CONTEXTS.PARTNERS) return intents.AboutChamberHandler(handlerInput);
        else if (curContext === GC.CONTEXTS.PARTNER_INFO) return intents.displayPartnerInfo(handlerInput);
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