const router = require('express').Router();
const controller = require('../controller/noteController');
const versionMiddleware = require('../middleware/versionate');
const layout = require('../view/homeView');


router.get('/', versionMiddleware('1.0.0'), controller.findAllNotes);
router.post('/', versionMiddleware('1.0.0'), controller.save);
router.get('/:id', versionMiddleware('1.0.0'), controller.findNoteById);
router.put('/:id', versionMiddleware('1.0.0'), controller.updateNote);
router.get('/:id/history', versionMiddleware('1.0.0'), controller.getHistory);

router.use(layout);
module.exports = router;