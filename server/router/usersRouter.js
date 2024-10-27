const router = require('express').Router();
const userController = require('../controller/usersController');
const versionMiddleware = require('../middleware/versionate');

router.get("/allUsers", versionMiddleware("1.0.0") ,userController.findAllUsers);
router.post("/", versionMiddleware("1.0.0") ,userController.addNewUser);
router.post('/login', versionMiddleware('1.0.0'), userController.login );
router.delete('/:id', versionMiddleware('1.0.0'), userController.deleteUser);
module.exports = router;