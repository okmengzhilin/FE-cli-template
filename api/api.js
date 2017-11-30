var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/test', function(req, res, next) {
	res.send({
    	code:200,
        message:"成功",
        result:{}
    });
});

module.exports = router;