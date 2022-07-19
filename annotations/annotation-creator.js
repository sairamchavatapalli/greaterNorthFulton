const GC = require('../alexa-handler/constants.json');
let mediaList = GC.DATA.GMSDC_SPOTLIGHT;
let skill = require('../alexa-handler/skill.json');
let mediaData = skill.interactionModel.languageModel.types[3].values

let annotations = []
mediaList.forEach( obj => {
    mediaData.forEach ( list => {
        if(obj.ID === list.name.value){
            
        }
    })
    let data = {
        "inputs": {
          "utterance": obj.name
        },
        "expected": [
          {
            "intent": {
              "name": "GmsdcTvIntent",
              "slots": {
                "video": {
                  "slotValue": {
                    "value": obj.ID,
                    "type": "Simple"
                  }
                }
              }
            }
          }
        ]
      }
      //console.log('data', JSON.stringify(data))
    annotations.push( JSON.stringify(data))
})

console.log(annotations)