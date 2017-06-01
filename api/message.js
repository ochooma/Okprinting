const json = {
  message: {
    text : ''
  },
  keyboard: {
    type: 'buttons',
    buttons: [],
  }
};

const quizzes = require('./quizzes');

var contexts = {};

function post(req, res) {
  let currentContext = contexts[req.body.user_key] || {
    index: 0,
    score: 0,
  };
  var quiz = quizzes[currentContext.index];
  if (req.body.content === quiz.answers[quiz.answerIndex]) {
    currentContext.score += 1;
    json.message.text = '정답입니다.\n';
  } else if (req.body.content !== '퀴즈시작하기') {
    json.message.text = '오답입니다.\n';
  }

  currentContext.index += 1;
  quiz = quizzes[currentContext.index];
  if (!quiz) {
    json.message.text = json.message.text + `퀴즈가 종료되었습니다 점수는 \
                        ${currentContext.score}/${quizzes.length}점입니다.`;
    json.keyboard.buttons = ['퀴즈시작하기'];
    delete contexts[req.body.user_key];
  } else {
    json.message.text = json.message.text + quiz.question;
    json.keyboard.buttons = quiz.answers;
    contexts[req.body.user_key] = currentContext;
  }
  res.json(json);
}

module.exports = {
  post: post,
};

