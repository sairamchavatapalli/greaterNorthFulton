const actions = require('./actions/intents');


let actionMap = new Map();

actionMap.set('LaunchRequest', actions.LaunchHandler);


module.exports = actionMap