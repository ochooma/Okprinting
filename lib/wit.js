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
    // if(entities.type) {
    //   context.change = entities.type.value;
    //   console.log(entities.type.value);
    //   console.log(`Session ${sessionId} received ${text}`);
    //   console.log(`The current context is ${JSON.stringify(context)}`);
    //   console.log(`Wit extracted ${JSON.stringify(entities)}`);
    //   delete context.missChange;
    // }
    // else {
    //   context.missChange = true;
    //   delete context.change;
    // }
    // return Promise.resolve(context);

    context.change = '휴대폰번호';
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    // console.log(entities["type"][0]["value"]);
    // console.log(entities["type"][0]);
    console.log(entities["type"]);
    // console.log(`Wit extracted`);
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
