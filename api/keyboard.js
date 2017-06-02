function get(req, res, _) {
  console.log(req.body);
  res.json({
    type: 'buttons',
    buttons: ['퀴즈시작하기', '동영상보기']
  });
}

const keyboard = {
  get: get
};

module.exports = keyboard;
