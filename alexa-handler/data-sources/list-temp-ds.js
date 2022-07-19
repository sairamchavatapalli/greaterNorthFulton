const generateListDs = (data) => {
    let hintText = ''
    if (data.hintText) hintText = `Try, "Alexa, ${data.hintText}"`
    let dataSources = {
        "listTemplate1Metadata": {
            "type": "object",
            "objectId": "lt1Metadata",
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": data.backgroundImage || "https://gmsdcsai.s3.amazonaws.com/gmsdcImages/backGroundImages/plain-Backgrounds1.jpg",
                        "size": "small",
                        "widthPixels": 0,
                        "heightPixels": 0
                    },
                    {
                        "url": data.backgroundImage || "https://gmsdcsai.s3.amazonaws.com/gmsdcImages/backGroundImages/plain-Backgrounds1.jpg",
                        "size": "large",
                        "widthPixels": 0,
                        "heightPixels": 0
                    }
                ]
            },
            "title": data.title,
            "hintText": hintText,
            "logoUrl": data.logoUrl || "",
            "developedByText": data.developedByText || "",
            "developedByUrl": data.developedByUrl || "",
            "headerBackButton": data.headerBackButton || ""
        },
        "listTemplate1ListData": {
            "type": "list",
            "listId": "lt1Sample",
            "properties": {
                "count": data.count,
                "listTitle": data.listTitle,
                "listItems": data.listItems
            },
            "transformers": [
                {
                    "transformer": "textToSpeech",
                    "inputPath": "listTitle",
                    "outputName": "listTitleSpeech"
                },
                {
                    "transformer": "ssmlToSpeech",
                    "inputPath": "listItems[*].primaryText",
                    "outputName": "textSpeech"
                }
            ]
        }
    }
    return dataSources;
}

module.exports = {
    generateListDs
}