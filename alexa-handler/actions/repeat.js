const RepeatHandler = (handlerInput) => {
      const { responseBuilder, attributesManager } = handlerInput
      const sessionAttributes = attributesManager.getSessionAttributes();

      let repeatText = `Ok, ${sessionAttributes.repeatSpeech}` || 'Sorry, there is no text to repeat!. What do you want to do.'

      let repromptText = "What do you want to do."

      return responseBuilder
      .speak(repeatText)
      .reprompt(repromptText)
      .getResponse();      
}

module.exports = {
    RepeatHandler
}