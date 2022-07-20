const CancelAndStopHandler = (handlerInput) => {
    const { responseBuilder } = handlerInput
    let speechText = "Thank you for using hindu temple of atlanta. Have a great day!";
    return responseBuilder
        .speak(speechText)
        .withShouldEndSession(true)
        .getResponse();
}

module.exports = {
    CancelAndStopHandler
}
