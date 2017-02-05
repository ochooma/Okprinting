const {Wit, log} = require('node-wit');
var callback;
const witClient = new Wit({
  accessToken: process.env.WIT_TOKEN,
  actions: {
    send(request, response) {
      return new Promise(function(resolve, _) {
        console.log('send ----------------------------');
        console.log(request);
        console.log(JSON.stringify(response));
        callback(response.text);
        return resolve();
      });
    },
    getContact({sessionId, context, text, entities}) {
      context.email = 'test@email.com';
      context.telephone = '010-0000-0000';
      console.log(`Session ${sessionId} received ${text}`);
      console.log(`The current context is ${JSON.stringify(context)}`);
      console.log(`Wit extracted ${JSON.stringify(entities)}`);
      return Promise.resolve(context);
    },
  },
  logger: new log.Logger(log.DEBUG) // optional
});

function run(sessionId, message, context, returnCb) {
  callback = returnCb;
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
