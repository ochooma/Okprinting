const {Wit, log} = require('node-wit');
const Promise = require('bluebird');

var callback;

const actions = {
  send(request, response) {
    console.log(request);
    console.log(JSON.stringify(response));
    if (callback) {
      callback(response.text);
    }
    return Promise.resolve();
  },
  getChange({sessionId, context, text, entities}) {
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);

    if (!entities.type) {
      context.missChange = true;
      delete context.change;
    } else {
      context.change = entities.type[0].value;
      delete context.missChange;
    }
    return Promise.resolve(context);
  },
};

const witClient = new Wit({
  accessToken: process.env.WIT_TOKEN,
  actions: actions,
  logger: new log.Logger(log.DEBUG)
});

function run(sessionId, message, context, replySend) {
  callback = replySend;
  return witClient.runActions(sessionId, message, context)
    .then((response) => {
      callback = null;
      return response;
    });
}

module.exports = {
  client: witClient,
  run: run,
};
