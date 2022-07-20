const GC = require('../constants.json');
const aplResponse = require('../apl-response')

const MembershipLevelHandler = (handlerInput) => {
    const { responseBuilder, attributesManager } = handlerInput;

    let sessionAttributes = attributesManager.getSessionAttributes();
    let contexts = sessionAttributes.contexts || []

    let speechText = ``
    repromptText = ' What would you like to do next?'
    if (handlerInput.hasAplSupport) {
        speechText = `Here are membership levels. For more details Please visit <sub alias="gnfcc.com slash membership slash membership levels">https://www.gnfcc.com/membership/membership-levels</sub>.`;
        let membershipLevelData = GC.DATA.MEMBERSHIP_LEVELS;

        let data = {
            title: membershipLevelData.title,
            hintText: 'go back',
            backgroundImage: "https://i.pinimg.com/originals/36/f0/94/36f0949c623b61a235fd6645fa507236.jpg",
            listItems: membershipLevelData.list
        }
        aplResponse.buildMembershipLevelRes(responseBuilder, data)
        contexts.unshift(GC.CONTEXTS.MEMBERSHIP_LEVEL);
    }
    else speechText = 'to see our membership levels please visit <sub alias="gnfcc.com slash membership slash membership levels">https://www.gnfcc.com/membership/membership-levels</sub>';

    sessionAttributes.contexts = contexts
    sessionAttributes.repeatSpeech = speechText

    return responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .getResponse()
}

module.exports = {
    MembershipLevelHandler
}