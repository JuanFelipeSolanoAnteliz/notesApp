const router = require('express').router();
const userController = require('../controller/usersController');
const versionMiddleware = require('../middleware/versionate');

router.post("/", versionMiddleware("1.0.0"), userController.findAllUsers);

module.exports = router;