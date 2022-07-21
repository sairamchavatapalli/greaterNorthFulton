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
            if (argument === "membership") return intents.MemberShipHandler(handlerInput)
            else if (argument === "events") return intents.MemberShipHandler(handlerInput)
            else if (argument === "businessDevelopment") return intents.MemberShipHandler(handlerInput)
            else if (argument === "aboutTheChamber") return intents.AboutChamberHandler(handlerInput)

        }
        else if (curContext === GC.CONTEXTS.MEMBERSHIP) {
            if (argument === "membershipLevels") return intents.MembershipLevelHandler(handlerInput)
            else if (argument === "memberBenefits") return intents.MemberBenefitsHandler(handlerInput)
            else if (argument === "memberDirectory") return intents.MemberShipHandler(handlerInput)
        }
        else if (curContext === GC.CONTEXTS.ABOUT_CHAMBER) {
            if (argument === "partners") return intents.displayPartnersHandler(handlerInput)
            else if (argument === "ourMission") return intents.displayPartnersHandler(handlerInput)
            else if (argument === "committtes") return intents.MemberShipHandler(handlerInput)
            else if (argument === "awards") return intents.MemberShipHandler(handlerInput)
        }
        else if (curContext === GC.CONTEXTS.PARTNERS) {
            return intents.displayPartnerInfo(handlerInput, argument)
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