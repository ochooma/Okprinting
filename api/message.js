const quizzes = require('./quizzes');
const videos = require('./videos');


var contexts = {};
const json = {
  message: {
    text : ''
  },
  keyboard: {
    type: 'buttons',
    buttons: [],
  }
};

function clone(a) {
  return JSON.parse(JSON.stringify(a));
}

function post(req, res) {
  let currentContext = contexts[req.body.user_key] || {
    type: req.body.content === '퀴즈시작하기' ? 'quiz' : 'video',
    index: -1,
    score: 0,
  };
  console.log(currentContext);
  try {
    switch (currentContext.type) {
      case 'quiz':
        res.json(runQuiz(req, currentContext));
        break;
      case 'video':
        res.json(runVideo(req, currentContext));
        break;
    }
  } catch (err) {
    console.log(err);
    res.json(json);
  }
}

function runQuiz(req, context) {
  var res = clone(json);
  var quiz = quizzes[context.index];
  if (quiz && req.body.content === quiz.answers[quiz.answerIndex]) {
    context.score += 1;
    res.message.text = '정답입니다.\n';
  } else if (req.body.content !== '퀴즈시작하기') {
    res.message.text = '오답입니다.\n';
  }

  context.index += 1;
  quiz = quizzes[context.index];
  if (!quiz) {
    res.message.text = res.message.text + `퀴즈가 종료되었습니다 점수는 \
                        ${context.score}/${quizzes.length}점입니다.`;
    res.keyboard.buttons = ['퀴즈시작하기', '동영상보기'];
    delete contexts[req.body.user_key];
  } else {
    res.message.text = res.message.text + quiz.question;
    res.keyboard.buttons = quiz.answers;
    contexts[req.body.user_key] = context;
  }
  console.log(contexts[req.body.user_key]);
  return res;
}

function runVideo(req) {
  var res = clone(json);
  var video = videos.find((v) => v.title === req.body.content);
  if (video) {
    res.message['message_button'] = {
      label: video.title,
      url: video.url,
    };
    res.keyboard.buttons = ['퀴즈시작하기', '동영상보기'];
    delete contexts[req.body.user_key];
  } else {
    res.message.text = '동영상을 선택해주세요.';
    res.keyboard.buttons = videos.map((v) => v.title);
  }
  return res;
}

module.exports = {
  post: post,
};

