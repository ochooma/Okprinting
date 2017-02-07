function del(req, res, _) {
  console.log('user leaved chat room!: ', req.params.user_key);
  console.log(req.body);
  res.json({});
}

const chatRoom = {
  delete: del
};

module.exports = chatRoom;
