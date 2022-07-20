const GC = require('../constants.json');
const aplResponse = require('../apl-response')

const MainMenuHandler = (handlerInput) => {
    const { responseBuilder, attributesManager } = handlerInput;

    let sessionAttributes = attributesManager.getSessionAttributes();
    let contexts = sessionAttributes.contexts || []

    let speechText = `Well, we have <break time = '0.15s'/>`;
    let repromptText = ' Choose one to know more.'

    let menuData = GC.DATA.MENU_DATA

    let length = menuData.list.length

    let listItems = []

    menuData.list.forEach((item, i) => {
        if (i === length - 1) speechText += `and ${item.name}.`;
        else speechText += `${item.name}, `;

        listItems.push({
            ordinalNumber: i + 1,
            primaryText: "<speak>" + item.name + "</speak>",
            primaryAction: [
                {
                    "type": "SendEvent",
                    "arguments": [item.id]
                }
            ]
        })
    })

    if (handlerInput.hasAplSupport) {

        let data = {
            title: menuData.title,
            hintText: menuData.list[0].name,
            backgroundImage: "https://hindoo.s3.amazonaws.com/images/background-plain2.jpg",
            listItems,
            count: listItems.length,
            listTitle: `Sure, Here is the main menu. Choose one to more about it.`
        }
        aplResponse.buildListRes(responseBuilder, data)
        speechText = ''
    }
    else speechText += repromptText

    contexts.unshift(GC.CONTEXTS.MENU_ITEM);

    sessionAttributes.contexts = contexts
    sessionAttributes.repeatSpeech = speechText

    attributesManager.setSessionAttributes(sessionAttributes)

    return responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .getResponse()

}

module.exports = {
    MainMenuHandler
}