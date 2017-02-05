function get(req, res, _) {
  console.log(req.body);
  res.json({
    type: 'buttons',
    buttons: ['연락처', '견적내기']
  });
}

const keyboard = {
  get: get
};

module.exports = keyboard;
