const router = require('express').Router();
const userController = require('../controller/usersController');
const versionMiddleware = require('../middleware/versionate');

router.get("/allNotes", versionMiddleware("1.0.0") ,userController.findAllUsers);

module.exports = router;