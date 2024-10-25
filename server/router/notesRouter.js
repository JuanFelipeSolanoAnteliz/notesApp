const router = require('express').Router();
const controller = require('../controller/noteController');
const versionMiddleware = require('../middleware/versionate');

router.get('/', versionMiddleware('1.0.0'), controller.findAllNotes);
router.post('/', versionMiddleware('1.0.0'), controller.save);

module.exports = router;