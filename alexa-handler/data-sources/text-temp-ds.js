const generateTextDs = (data) => {
    let hintText = ''
    if (data.hintText) hintText = `Try, "Alexa, ${data.hintText}"`
    let ssmlText = data.ssmlText || data.text
    let dataSources = {
        "normalText": {
            "type": "object",
            "objectId": "lt1Metadata",
            "bgImg": data.bgImg,
            "logoUrl": data.logoUrl || "", 
            "developedByText": data.developedByText || "",
            "developedByUrl": data.developedByUrl || "",
            "title": data.title,
            "text": data.text,
            "hintText": hintText,
            "headerBackButton": data.headerBackButton || "",
            "headerBackButtonCommand": data.headerBackButtonCommand,
            "properties":{
                "text": "<speak>"+ssmlText+"</speak>"
            },
            "transformers": [{
                "transformer": "ssmlToSpeech",
                "inputPath": "text",
                "outputName": "textToSpeech"
            }],
        }
    }
    return dataSources;
}

module.exports = {
    generateTextDs
}