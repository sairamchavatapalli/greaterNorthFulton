const generateVideoDs = (data) => {
    let hintText = ''
    if (data.hintText) hintText = `Try, "Alexa, ${data.hintText}"`
    let dataSources = {
        "videoplayerData": {
            "type": "object",
            "properties": {
                "videoUrl": data.videoUrl,
                "title": data.title,
                "videoID": data.videoID
            }
        }
    }
    return dataSources;
}

module.exports = {
    generateVideoDs
}