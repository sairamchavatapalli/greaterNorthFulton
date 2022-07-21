const aplResponse = require('../apl-response');
const GC = require('../constants.json');
const { getValueBySlot } = require('../commonFun')

const displayPartnersHandler = (handlerInput) => {
    const { responseBuilder, attributesManager } = handlerInput;

    let sessionAttributes = attributesManager.getSessionAttributes();
    let contexts = sessionAttributes.contexts || []

    let speechText = `Ok, Here is our partners <break time = '0.15s'/>`;
    let repromptText = ' Which one would you like to know?'

    let partnersData = GC.DATA.PARTNERS

    let length = partnersData.list.length

    let listItems = []

    partnersData.list.forEach((item, i) => {
        if (i === length - 1) speechText += `and ${item.name}.`;
        else speechText += `${item.name}, `;

        listItems.push({
            primaryText: item.name,
            secondaryText: item.type,
            imageUrl: item.imageUrl,
            primaryAction: [
                {
                    "type": "SendEvent",
                    "arguments": [item.id]
                }
            ]
        })
    })

    speechText += repromptText

    if (handlerInput.hasAplSupport) {

        let data = {
            title: partnersData.title,
            hintText: partnersData.list[0].name,
            backgroundImage: "https://d25vdjj6kk718x.cloudfront.net/bishop/bg_shopping_01.jpg",
            listItems,
        }
        aplResponse.buildListImgHorRes(responseBuilder, data)
    }

    contexts.unshift(GC.CONTEXTS.PARTNERS);

    sessionAttributes.contexts = contexts
    sessionAttributes.repeatSpeech = speechText

    attributesManager.setSessionAttributes(sessionAttributes)

    return responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .getResponse()
}

const PartnersHandler = (handlerInput) => {
    const { requestEnvelope, Alexa } = handlerInput;

    let partnerSlot = Alexa.getSlot(requestEnvelope, 'partnerName');
    let partnerName = getValueBySlot(partnerSlot);
    if (partnerName) return displayPartnerInfo(handlerInput, partnerName)
    else return displayPartnersHandler(handlerInput)

}

const displayPartnerInfo = (handlerInput, partnerName) => {
    let { responseBuilder, attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();

    let contexts = sessionAttributes.contexts || []

    let speechText = ``;
    let repromptText = ' What would like to do next?'
    let partnerData = GC.DATA.PARTNERS.list

    let partnerFound = partnerData.find(data => data.id === partnerName);
    if (!partnerFound) speechText = `Sorry, ${partnerName} is not found. Please try say partner to see the partners.` + repromptText
    else {
        if (handlerInput.hasAplSupport) {
            let data = {
                backgroundImage: "https://tech-alpha-sai.s3.amazonaws.com/images/bgImages/Tech-Alpharetta-Blue-BG.jpg",
                title: partnerFound.name,
                image: partnerFound.imageUrl,
                primaryText: partnerFound.htmlText,
                ssmlText: partnerFound.ssmlText + repromptText,
                hintText: "go back"
            }
            aplResponse.buildBodyRes(responseBuilder, data)
        }
        else speechText = partnerFound.ssmlText + repromptText
        contexts.unshift(GC.CONTEXTS.PARTNER_INFO);

    }
    sessionAttributes.contexts = contexts;
    sessionAttributes.repeatSpeech = speechText

    attributesManager.setSessionAttributes(sessionAttributes)

    return responseBuilder
        .speak(speechText)
        .reprompt(handlerInput.t('REPROMPT_MSG'))
        .getResponse();
}

module.exports = {
    PartnersHandler,
    displayPartnersHandler,
    displayPartnerInfo
}