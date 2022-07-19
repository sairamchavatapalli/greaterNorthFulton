const GC = require('../constants.json')
const aplResponse = require('../apl-response')


const LaunchHandler = (handlerInput) => {
    let { responseBuilder, attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();

    let contexts = sessionAttributes.contexts || []

    let text = `Welcome to Greater North Fulton. The mission of the Greater North Fulton Chamber of Commerce is
    to be the recognized leader for business growth, talent development and regional prosperity. Would you like to hear the menu option?`

    let speechText = `Welcome to Greater North Fulton. The mission of the Greater North Fulton Chamber of Commerce is
    to be the recognized leader for business growth, talent development and regional prosperity. Would you like to hear the menu option?`

    let repromptText = " Would you like to hear the menu option?";

    if (handlerInput.hasAplSupport) {
        let data = {
            bgImg: "https://hindoo.s3.amazonaws.com/images/background-plain3.jpg",
            title: "Hindu Temple of Atlanta",
            text: text,
            ssmlText: speechText,
            hintText: `Show Main Menu`

        }
        aplResponse.buildTextRes(responseBuilder, data)
        speechText = ''
    }

    contexts.unshift(GC.CONTEXTS.SHOW_MENU);

    sessionAttributes.contexts = contexts;
    sessionAttributes.repeatSpeech = speechText

    attributesManager.setSessionAttributes(sessionAttributes)

    return responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .getResponse();
}

module.exports = {
    LaunchHandler
}