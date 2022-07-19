const generateBodyDs = (data) => {
    let hintText = '';
    let ssmlText = data.ssmlText || data.primaryText
    if (data.hintText) hintText = `Try, "Alexa, ${data.hintText}"`
    let dataSources = {
        "bodyTemp2Data": {
            "type": "object",
            "objectId": "detailImageRightSample",
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": data.backgroundImage || "https://d2o906d8ln7ui1.cloudfront.net/images/templates_v3/detail/DetailListBackground_Light.png",
                        "size": "small"
                    }
                ]
            },
            "title": data.title || "",
            "headerBackButton": data.headerBackButton || "",
            "subtitle": data.subtitle || "",
            "image": {
                "contentDescription": "",
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": data.image || "",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": data.primaryText || ""
                }
            },
            "properties": {
                "text": "<speak>" + ssmlText + "</speak>"
            },
            "transformers": [{
                "transformer": "ssmlToSpeech",
                "inputPath": "text",
                "outputName": "textToSpeech"
            }],
            // "logoUrl": "https://tech-alpha-sai.s3.amazonaws.com/images/mainImages/tech-alpha-logo.png",
            "hintText": hintText
        }
    }
    return dataSources
}

module.exports = {
    generateBodyDs
}