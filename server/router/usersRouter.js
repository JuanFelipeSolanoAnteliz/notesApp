const router = require('express').Router();
const userController = require('../controller/usersController');
const versionMiddleware = require('../middleware/versionate');
const layout = require('../view/loginView');
const LayoutSignup = require('../view/signUpView');

router.post("/", versionMiddleware("1.0.0") ,userController.addNewUser);
router.post('/login', versionMiddleware('1.0.0'), userController.login );
router.delete('/:id', versionMiddleware('1.0.0'), userController.deleteUser);

router.use(layout);
router.use('/signup',LayoutSignup);
module.exports = router;