const intents = require('./intents');
const GC = require('../constants.json');

const menuOrdinal = (handlerInput, number) => {
  const { responseBuilder } = handlerInput;
  let speechText = `Sorry, invalid option. Please choose valid option or say "help" for help`
  if (number === 0) return intents.member(handlerInput)

  return responseBuilder
    .speak(speechText)
    .reprompt(speechText)
    .getResponse();
}

const aboutUsOrdinal = (handlerInput, number) => {
  const { responseBuilder } = handlerInput;
  let speechText = `Sorry, invalid option. Please choose valid option or say "help" for help`
  if (number === 0) return intents.DeitiesHandler(handlerInput)


  return responseBuilder
    .speak(speechText)
    .reprompt(speechText)
    .getResponse();
}

const activityOrdinal = (handlerInput, number) => {
  const { responseBuilder } = handlerInput;
  let speechText = `Sorry, invalid option. Please choose valid option or say "help" for help`;
  let activityList = GC.DATA.SUNDAY_ACTIVITIES.list

  let activity = activityList[number];
  if (activity) return intents.displayActivityInfo(handlerInput, activity.id)

  return responseBuilder
    .speak(speechText)
    .reprompt(speechText)
    .getResponse();
}
const facilityOrdinal = (handlerInput, number) => {
  const { responseBuilder } = handlerInput;
  let speechText = `Sorry, invalid option. Please choose valid option or say "help" for help`;
  let facilityList = GC.DATA.FACILITY_RENTAL.list

  let facility = facilityList[number];
  if (facility) return intents.displayRentalInfo(handlerInput, facility.id)

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
    else if (curContext === GC.CONTEXTS.ABOUT_US) return aboutUsOrdinal(handlerInput, indexVal);
    else if (curContext === GC.CONTEXTS.SUNDAY_ACTIVITIES) return activityOrdinal(handlerInput, indexVal);
    else if (curContext === GC.CONTEXTS.FACILITY_RENTAL) return facilityOrdinal(handlerInput, indexVal);

  }

  return responseBuilder
    .speak(speechText)
    .reprompt(speechText)
    .getResponse();

}

module.exports = {
  OrdinalHandler
}