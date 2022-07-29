const listTemplate = require('./templates/list-template.json');
const pageTemplate = require('./templates/page-template.json');
const textTemplate = require('./templates/text-template.json');
const bodyTemplate = require('./templates/body-template.json');
const listImgHorTemplate = require('./templates/list-img-horizontal.json')
const gridTemplate = require('./templates/grid-template.json');
const videoTemplate = require('./templates/video-template.json');
const memberBenefitTemplate = require('./templates/member-benefit.json');
const membershipLevelTemplate = require('./templates/membership-level.json');
const contactInfoTemplate = require('./templates/contact-info-template.json');

const { generatePageDs } = require('./data-sources/page-temp-ds');
const { generateTextDs } = require('./data-sources/text-temp-ds');
const { generateBodyDs } = require('./data-sources/body-temp-ds');
const { generateListDs } = require('./data-sources/list-temp-ds');
const { generateListImgHoriDs } = require('./data-sources/list-img-hor-temp-ds');
const { generateGridDs } = require('./data-sources/grid-temp-ds');
const { generateVideoDs } = require('./data-sources/video-temp-ds');
const { memberBenefitDs } = require('./data-sources/member-benefit-ds');
const { membershipLevelDs } = require('./data-sources/membership-level-ds');
const { generateContactInfoDs } =  require('./data-sources/contact-info-temp-ds')


const buildPageRes = (responseBuilder, data, token = "launchToken") => {
    responseBuilder.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        token: token,
        document: pageTemplate,
        datasources: generatePageDs(data)
    })
}

const buildMemberBenefitRes = (responseBuilder, data, token = "memberBenefit") => {
    responseBuilder.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.6',
        token: token,
        document: memberBenefitTemplate,
        datasources: memberBenefitDs(data)
    })
}

const buildContactInfoRes = (responseBuilder, data, token = "launchToken") => {
    responseBuilder.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        token: token,
        document: contactInfoTemplate,
        datasources: generateContactInfoDs(data)
    })
}

const buildMembershipLevelRes = (responseBuilder, data, token = "membershipLevel") => {
    responseBuilder.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.6',
        token: token,
        document: membershipLevelTemplate,
        datasources: membershipLevelDs(data)
    })
}

const buildTextRes = (responseBuilder, data, token = "launchToken") => {
    responseBuilder.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        token: token,
        document: textTemplate,
        datasources: generateTextDs(data)
    }).addDirective({
        type: 'Alexa.Presentation.APL.ExecuteCommands',
        token: token,
        commands: [
            {
                type: 'SpeakItem',
                componentId: 'Narrative',
                highlightMode: 'line',
                align: 'last'
            }
        ]
    })
}

const buildListImgHorRes = (responseBuilder, data, token = "listImg") => {
    responseBuilder.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.6',
        token: token,
        document: listImgHorTemplate,
        datasources: generateListImgHoriDs(data)
    })
}


const buildListRes = (responseBuilder, data, token = "launchToken") => {
    responseBuilder.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        token: token,
        document: listTemplate,
        datasources: generateListDs(data)
    }).addDirective({
        type: 'Alexa.Presentation.APL.ExecuteCommands',
        token: token,
        commands: [
            {
                "type": "SpeakItem",
                "componentId": "listTitleId",
                "highlightMode": "line"
            },
            {
                "type": "SpeakList",
                "componentId": "speakableSequence",
                "align": "center",
                "count": "${payload.listTemplate1ListData.properties.count}",
                "start": 0
            }
        ]
    })
}

const buildBodyRes = (responseBuilder, data, token = "launchToken") => {
    responseBuilder.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        token: token,
        document: bodyTemplate,
        datasources: generateBodyDs(data)
    }).addDirective({
        type: 'Alexa.Presentation.APL.ExecuteCommands',
        token: token,
        commands: [
            {
                type: 'SpeakItem',
                componentId: 'Narrative',
                highlightMode: 'line',
                align: 'last'
            }
        ]
    })
}

const buildGridRes = (responseBuilder, data, token = "launchToken") => {
    responseBuilder.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        token: token,
        document: gridTemplate,
        datasources: generateGridDs(data)
    })
}

const buildVideoRes = (responseBuilder, data, token = "videoplayer") => {
    responseBuilder.addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.6',
        token: token,
        document: videoTemplate,
        datasources: generateVideoDs(data)
    })
}


module.exports = {
    buildBodyRes, buildContactInfoRes, buildMemberBenefitRes, buildMembershipLevelRes, buildListRes, buildPageRes, buildTextRes, buildGridRes, buildVideoRes, buildListImgHorRes
}