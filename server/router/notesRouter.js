const router = require('express').Router();
const controller = require('../controller/noteController');
const versionMiddleware = require('../middleware/versionate');

router.get('/', versionMiddleware('1.0.0'), controller.findAllNotes);
router.post('/', versionMiddleware('1.0.0'), controller.save);
router.get('/:id', versionMiddleware('1.0.0'), controller.findNoteById);
module.exports = router;