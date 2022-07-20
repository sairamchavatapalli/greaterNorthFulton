const membershipLevelDs = (data) => {
    let hintText = ''
    if (data.hintText) hintText = `Try, "Alexa, ${data.hintText}"`
    let dataSources = {
        "membershipLevelData": {
            "type": "object",
            "objectId": "memberShipLevel",
            "backgroundImage": data.backgroundImage,
            "title": data.title,
            "headerBackButton": true,
            "listItems": data.listItems,
            "logoUrl": "https://tech-alpha-sai.s3.amazonaws.com/images/mainImages/tech-alpha-logo.png",
            "hintText": hintText
        }
    }
    return dataSources;
}

module.exports = {
    membershipLevelDs
}