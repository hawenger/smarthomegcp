'use strict';

// Dependencies
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

// Enable debugging statements
process.env.DEBUG = 'dialogflow:debug';

exports.dialogflowFirebaseFulfillment = 
  functions.https.onRequest((request, response) => {
    // Set up the client and log the request we just got.
    const agent = new WebhookClient({ request, response });

    function setupIntents() {
      let intentMap = new Map();
      intentMap.set('Default Welcome Intent', welcome);
      intentMap.set('Default Fallback Intent', fallback);
      intentMap.set('log entry', logEntryHandler);

      // intentMap.set('<INTENT_NAME_HERE>', yourOtherFunctionHandler);
      
      return intentMap;
    }

    // The agent welcome handler
    function welcome (agent) {
      agent.add(`Welcome to my agent!`);
    }

    // The "I dunno" handler 
    function fallback (agent) {
      agent.add(`I didn't understand`);
      agent.add(`I'm sorry, can you try again?`);
    }
  
    // The handler for the "log entry" intent
    function logEntryHandler(agent) {
      agent.add(`Great! You did: ${agent.parameters.entry}`);
    }

    // The handler for the "log entry" intent, with an Assistant card in the output
    function logEntryHandler2(agent) {
      agent.add(`Great!: ${agent.parameters.entry}`);
      agent.add(new Card({
          title: `${agent.parameters.date}`,
          imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_HOR.png',
          text: `${agent.parameters.entry}`,
        })
      );
    }
  
    // Log some debugging information
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
   
    // Run the proper function handler based on the matched Dialogflow intent name
    agent.handleRequest(setupIntents());
  }
);