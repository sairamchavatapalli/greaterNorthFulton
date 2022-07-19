const generateListImgHoriDs = (data) => {
    let hintText = ''
    if (data.hintText) hintText = `Try, "Alexa, ${data.hintText}"`
    let dataSources = {
        "imageListData": {
            "type": "object",
            "objectId": "imageListSample",
            "backgroundImage": data.backgroundImage,
            "title": data.title,
            "headerBackButton": data.headerBackButton,
            "listItems": data.listItems,
            // "logoUrl": "https://tech-alpha-sai.s3.amazonaws.com/images/mainImages/tech-alpha-logo.png",
            "hintText": hintText
        }
    }
    return dataSources;
}

module.exports = {
    generateListImgHoriDs
}