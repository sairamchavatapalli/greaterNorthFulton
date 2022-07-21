const intents = require('./intents');
const GC = require('../constants.json');

const menuOrdinal = (handlerInput, number) => {
  const { responseBuilder } = handlerInput;
  let speechText = `Sorry, invalid option. Please choose valid option or say "help" for help`
  if (number === 0) return intents.MemberShipHandler(handlerInput)
  else if (number === 2) return intents.BusinessDevelopmentHandler(handlerInput)
  else if (number === 3) return intents.AboutChamberHandler(handlerInput)

  return responseBuilder
    .speak(speechText)
    .reprompt(speechText)
    .getResponse();
}

const aboutChamberOrdinal = (handlerInput, number) => {
  const { responseBuilder } = handlerInput;
  let speechText = `Sorry, invalid option. Please choose valid option or say "help" for help`
  if (number === 0) return intents.PartnersHandler(handlerInput)


  return responseBuilder
    .speak(speechText)
    .reprompt(speechText)
    .getResponse();
}

const membershipOrdinal = (handlerInput, number) => {
  const { responseBuilder } = handlerInput;
  let speechText = `Sorry, invalid option. Please choose valid option or say "help" for help`
  if (number === 0) return intents.MembershipLevelHandler(handlerInput)
  else if (number === 1) return intents.MemberBenefitsHandler(handlerInput)
  if (number === 2) return intents.MembershipLevelHandler(handlerInput)

  return responseBuilder
    .speak(speechText)
    .reprompt(speechText)
    .getResponse();
}

const OrdinalHandler = (handlerInput) => {
  const { requestEnvelope, responseBuilder, attributesManager, Alexa } = handlerInput;

  let sessionAttributes = attributesManager.getSessionAttributes();
  let contexts = sessionAttributes.contexts || [];
  let number = Alexa.getSlotValue(requestEnvelope, 'number');

  let speechText = `Sorry, invalid option. Please choose valid option or say "help" for help`;

  if (contexts.length > 0 && number) {
    let indexVal = Number(number) - 1;
    let curContext = contexts[0];
    if (curContext === GC.CONTEXTS.MENU_ITEM) return menuOrdinal(handlerInput, indexVal);
    else if (curContext === GC.CONTEXTS.ABOUT_CHAMBER) return aboutChamberOrdinal(handlerInput, indexVal);
    else if (curContext === GC.CONTEXTS.MEMBERSHIP) return membershipOrdinal(handlerInput, indexVal);
  }

  return responseBuilder
    .speak(speechText)
    .reprompt(speechText)
    .getResponse();

}

module.exports = {
  OrdinalHandler
}