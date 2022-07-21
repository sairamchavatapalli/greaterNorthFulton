const actions = require('./actions/intents');

const { YesHandler } = require('./actions/yes-handler');
const { TouchHandler } = require('./actions/touch-event');
const { OrdinalHandler } = require('./actions/ordinal-handler');
const { GoBackHandler } = require('./actions/go-back');


let actionMap = new Map();

actionMap.set('LaunchRequest', actions.LaunchHandler);
actionMap.set('MainMenuIntent', actions.MainMenuHandler);
actionMap.set('MembershipIntent', actions.MemberShipHandler);
actionMap.set('MemberBenefitsIntent', actions.MemberBenefitsHandler);
actionMap.set('MembershipLevelsIntent', actions.MembershipLevelHandler);
actionMap.set('BusinessDevelopmentIntent', actions.BusinessDevelopmentHandler);
actionMap.set('AboutChamberIntent', actions.AboutChamberHandler);
actionMap.set('PartnersIntent', actions.PartnersHandler);
actionMap.set('AMAZON.NoIntent', actions.NoHandler);
actionMap.set('AMAZON.YesIntent', YesHandler);
actionMap.set('OrdinalIntent', OrdinalHandler);
actionMap.set('GoBackIntent', GoBackHandler);
actionMap.set('Alexa.Presentation.APL.UserEvent', TouchHandler)


module.exports = actionMap