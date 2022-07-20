
const NoHandler = (handlerInput) => {
    const { responseBuilder, attributesManager } = handlerInput;

    let sessionAttributes = attributesManager.getSessionAttributes();

    let speechText = `Thank you for using Greater North Fulton. Have a great day!`;

    return responseBuilder
        .speak(speechText)
        .withShouldEndSession(true)
        .getResponse();
}

module.exports = {
    NoHandler
}