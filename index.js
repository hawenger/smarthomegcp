'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  function setupIntents() {
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('New Entry', newEntryHandler);

    return intentMap;
  }

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function newEntryHandler(agent) {
    agent.add(`Got your entry for ${agent.parameters.date}`);
  }

  function newEntryHandler2(agent) {
    agent.add(`Got your entry for ${agent.parameters.date}`);
    agent.add(new Card({
        title: `${agent.parameters.date}`,
        imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_HOR.png',
        text: `${agent.parameters.entry}`,
      })
    );
  }

  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  // Run the proper function handler based on the matched Dialogflow intent name
  agent.handleRequest(setupIntents());
}
);
