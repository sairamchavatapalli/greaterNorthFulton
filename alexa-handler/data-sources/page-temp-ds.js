const generatePageDs = (data) => {
    let hintText = ''
    if (data.hintText) hintText = `Try, "Alexa, ${data.hintText}"`
    let dataSources = {
        "eventListMetaData": {
            "type": "object",
            "objectId": "lt1Metadata",
            "title": data.title,
            "logoUrl": data.logoUrl || "",
            "headerBackButton": ""
        },
        "eventListData": {
            "type": "list",
            "listId": "lt1Sample",
            "properties": {
                "count": data.count,
                "listItems": data.listItems
            },
            "transformers": [
                {
                    "transformer": "textToSpeech",
                    "inputPath": "listItems[*].name",
                    "outputName": "textSpeech"
                }
            ]
        }
    }
    return dataSources;
}

module.exports = {
    generatePageDs
}