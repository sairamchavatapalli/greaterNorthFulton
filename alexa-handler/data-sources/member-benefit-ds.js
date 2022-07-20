const memberBenefitDs = (data) => {
    let hintText = ''
    if (data.hintText) hintText = `Try, "Alexa, ${data.hintText}"`
    let dataSources = {
        "memberBenefitData": {
            "type": "object",
            "objectId": "memberBenefit",
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
    memberBenefitDs
}