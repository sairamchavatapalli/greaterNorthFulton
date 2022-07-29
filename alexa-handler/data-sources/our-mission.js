const aplResponse = require('../apl-response');
const GC = require('../constants.json');

const ContactInfoHandler = (handlerInput) => {
    const { responseBuilder, attributesManager } = handlerInput;

    let sessionAttributes = attributesManager.getSessionAttributes();
    let contexts = sessionAttributes.contexts || []

    let speechText = `You can call us at <say-as interpret-as="telephone">6786647958</say-as>, or Contact Us on our page, <sub alias="tech alpharetta.com slash contact">https://techalpharetta.com/contact</sub>, Or You can reach us on <sub alias="tech alpharetta.com">https://techalpharetta.com</sub>.`;
    let repromptText = ' What do you want to do?';

    let data = {
        title: "CONTACT US",
        backgroundImage: "https://tech-alpha-sai.s3.amazonaws.com/images/bgImages/contact-us.png"
    }

    if(handlerInput.hasAplSupport)  aplResponse.buildContactInfoRes(responseBuilder, data)
    speechText += repromptText

    contexts.unshift(GC.CONTEXTS.CONTACT_INFO);

    sessionAttributes.contexts = contexts
    sessionAttributes.repeatSpeech = speechText

    attributesManager.setSessionAttributes(sessionAttributes)

    return responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse()
}

module.exports = { 
    ContactInfoHandler 
}