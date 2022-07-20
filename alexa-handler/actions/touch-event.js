const GC = require('../constants.json')
const intents = require('./intents');
const { GoBackHandler } = require('./go-back');

const TouchHandler = (handlerInput) => {

    const { responseBuilder, attributesManager } = handlerInput;

    let sessionAttributes = attributesManager.getSessionAttributes();
    let contexts = sessionAttributes.contexts || []

    const { request } = handlerInput.requestEnvelope;
    let arguments = request.arguments;
    let argument = arguments[0];
    let speechText = `Sorry, Unable to process you input`

    // Test Simulator is sending JSON while device will send String
    try { argument = JSON.parse(argument); } catch (e) { }

    console.log('Touch event arguments: ' + JSON.stringify(argument), contexts);

    if (argument === "goBack") return GoBackHandler(handlerInput, arguments)
    else if (contexts.length > 0) {
        let curContext = contexts[0];
        if (curContext === GC.CONTEXTS.MENU_ITEM) {
            if (argument === "vahanaSeva") return intents.VahanaSevaHandler(handlerInput)
            else if (argument === "thisMonthEvents") return intents.askForDate(handlerInput)
            else if (argument === "specialEvents") return intents.SpecialEventsHandler(handlerInput)
            else if (argument === "sundayActivities") return intents.SundayActivitiesHandler(handlerInput)
            else if (argument === "poojaMaterials") return intents.PoojMaterialsHandler(handlerInput)
            else if (argument === "facilityRental") return intents.FacilityRentalHandler(handlerInput)
            else if (argument === "donation") return intents.DonationHandler(handlerInput)
            else if (argument === "aboutUs") return intents.AboutUsHandler(handlerInput)
        }
        else if (curContext === GC.CONTEXTS.SUNDAY_ACTIVITIES) {
            return intents.displayActivityInfo(handlerInput, argument)
        }
        else if (curContext === GC.CONTEXTS.FACILITY_RENTAL) {
            return intents.displayRentalInfo(handlerInput, argument)
        }
        else if (curContext === GC.CONTEXTS.ABOUT_US) {
            if (argument === "deities") return intents.DeitiesHandler(handlerInput)
            else if (argument === "committee") return intents.CommitteHandler(handlerInput)
            else if (argument === "priests") return intents.PriestHandler(handlerInput)
        }
    }

    return responseBuilder
        .speak(speechText)
        .reprompt(handlerInput.t('REPROMPT_MSG'))
        .getResponse();
}

module.exports = {
    TouchHandler
}