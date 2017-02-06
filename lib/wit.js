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
  getContact({sessionId, context, text, entities}) {
    context.email = 'ochooma@gmail.com';
    context.telephone = '010-3737-1791';
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
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
