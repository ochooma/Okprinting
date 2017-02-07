const express = require('express');
const router = express.Router();
const api = require('../api');

/* GET home page. */
router.get('/', (req, res, _) => {
  res.render('index', {title: 'Express'});
});

router.get('/keyboard', api.keyboard.get);
router.post('/message', api.message.post);
router.post('/friend', api.friend.post);
router.delete('/friend/:user_key', api.friend.delete);
router.delete('/chat_room/:user_key', api.chatRoom.delete);

module.exports = router;
