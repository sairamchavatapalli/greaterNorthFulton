const generateGridDs = (data) => {
    let hintText = ''
    if (data.hintText) hintText = `Try, "Alexa, ${data.hintText}"`
    let dataSources = {
        "gridListData": {
            "type": "object",
            "objectId": "gridListSample",
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://hindoo.s3.amazonaws.com/images/background-plain2.jpg",
                        "size": "small",
                        "widthPixels": 0,
                        "heightPixels": 0
                    },
                    {
                        "url": "https://hindoo.s3.amazonaws.com/images/background-plain2.jpg",
                        "size": "large",
                        "widthPixels": 0,
                        "heightPixels": 0
                    }
                ]
            },
            "title": data.title,
            "listItems": data.listItems,
            "logoUrl": data.logoUrl || ""
        }
    }
    return dataSources;
}

module.exports = {
    generateGridDs
}