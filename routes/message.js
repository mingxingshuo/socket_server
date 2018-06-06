var express = require('express');
var router = express.Router();
var MessageServer = require('../message_server')

router.use('/taobaoke', function(req, res, next) {
    var data = req.body;
    MessageServer.getInstance(null).req_title_token(data);
    res.send('')
})

router.use('/baokuan', function(req, res, next) {
    var data = req.body;
    MessageServer.getInstance(null).get_one_baokuan(data);
    res.send('')
})

module.exports = router;
