const wit = require('../lib/wit');
const json = {
  message: {
    text : ''
  }
};

function post(req, res, _) {
  console.log(req.body);
  var sessionKey = (new Date()).toString();
  //wit.run(req.body.user_key, req.body.content, {}, (message) => {
  wit.run(sessionKey, req.body.content, {}, (message) => {
    json.message.text = message;
    res.json(json);
  }).then((witResponse) => {
    console.log('witResponse:', witResponse);
  }).catch((e) => {
    console.log('exception:', e);
    json.message.text = '오류가 발생하였습니다';
    res.json(json);
  });
}

const message = {
  post: post
};

module.exports = message;
