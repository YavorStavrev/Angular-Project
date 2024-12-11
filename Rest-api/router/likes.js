const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { themeController } = require('../controllers');



router.put('/:themeId', auth(), themeController.likeTheme);

module.exports = router
