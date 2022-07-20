const GC = require('../constants.json');
const aplResponse = require('../apl-response')

const MemberBenefitsHandler = (handlerInput) => {
    const { responseBuilder, attributesManager } = handlerInput;

    let sessionAttributes = attributesManager.getSessionAttributes();
    let contexts = sessionAttributes.contexts || []

    let speechText = ``
    repromptText = ' What would you like to do next?'
    if (handlerInput.hasAplSupport) {
        speechText = `Here is member benefit. For more details Please visit <sub alias="gnfcc.com slash membership slash member benefits">https://www.gnfcc.com/membership/member-benefits</sub>.`;
        let memberBenefitData = GC.DATA.MEMBER_BENEFIT;

        let data = {
            title: memberBenefitData.title,
            hintText: 'go back',
            backgroundImage: "https://i.pinimg.com/originals/36/f0/94/36f0949c623b61a235fd6645fa507236.jpg",
            listItems: memberBenefitData.list
        }
        aplResponse.buildMemberBenefitRes(responseBuilder, data)
        contexts.unshift(GC.CONTEXTS.MEMBER_BENEFIT);
    }
    else speechText = 'to see our member benefit please visit <sub alias="gnfcc.com slash membership slash member benefits">https://www.gnfcc.com/membership/member-benefits</sub>';

    sessionAttributes.contexts = contexts
    sessionAttributes.repeatSpeech = speechText

    return responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .getResponse()
}

module.exports = {
    MemberBenefitsHandler
}