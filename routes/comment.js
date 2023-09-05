const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');
const commentCtrl = require('../controllers/comment');

//router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/',  commentCtrl.createComment);
router.delete('/:id', commentCtrl.deleteComment);
router.get('/:id', auth, commentCtrl.getAllCommentActu);
router.patch('/:id', auth, commentCtrl.updateComment);
// router.get('/last', auth, commentCtrl.getLastcomment);



module.exports = router;