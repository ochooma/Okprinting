const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, _) => {
  res.render('index', {title: 'Express'});
});

router.get('/keyboard', (req, res, _) => {
  console.log(req.body);
  res.json({
    type: 'buttons',
    buttons: ['선택 1', '선택 2', '선택 3']
  });
});

router.post('/message', (req, res, _) => {
  console.log(req.body);
  res.json({
    message: {
      text : '감사합니다.'
    }
  });
});

router.delete('/friend/:userKey', (req, res, _) => {
  console.log('user disconnected!: ', req.params.userKey);
  console.log(req.body);
  res.json({});
});

router.delete('/chat_room/:userKey', (req, res, _) => {
  console.log('user closed chat room!: ', req.params.userKey);
  console.log(req.body);
  res.json({});
});

module.exports = router;
