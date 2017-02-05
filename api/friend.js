function post(req, res, _) {
  console.log('user added!: ', req.params.userKey);
  console.log(req.body);
  res.json({});
}

function del(req, res, _) {
  console.log('user removed!: ', req.params.userKey);
  console.log(req.body);
  res.json({});
}

const friend = {
  post: post,
  delete: del,
};

module.exports = friend;
