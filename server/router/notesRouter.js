const router = require('express').Router();
const controller = require('../controller/noteController');
const versionMiddleware = require('../middleware/versionate');
const layout = require('../view/homeView');
const detailLayout = require('../view/detailView');
const { auth } = require('../middleware/decodedJWT');

router.use(auth);

router.get('/', versionMiddleware('1.0.0'), controller.findAllNotes);
router.post('/', versionMiddleware('1.0.0'), controller.save);
router.get('/:id', versionMiddleware('1.0.0'), controller.findNoteById);
router.put('/:id', versionMiddleware('1.0.0'), controller.updateNote);
router.get('/:id/history', versionMiddleware('1.0.0'), controller.getHistory);
router.delete('/:id', versionMiddleware('1.0.0'), controller.deleteNoteById)

router.use(layout);
router.use('/detail', detailLayout);
module.exports = router;