const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const guiPath = path.join(__dirname,"../gui/");

router.get('/', function(req, res, next) {
    res.redirect("/index");
});

router.get('/index', function(req, res, next) {
    res.sendFile(guiPath+"/index.html");
});

module.exports = router;