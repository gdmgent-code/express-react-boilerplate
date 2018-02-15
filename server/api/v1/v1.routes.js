const express = require('express');
const NMDController = require('./controllers/nmd.controller');
const PostController = require('./controllers/post.controller');

const router = express.Router();
router.route('/nmd').get(NMDController.getHello);
router.route('/nmd/lecturers').get(NMDController.getLecturers);
router.route('/posts').get(PostController.getPosts);
router.route('/posts/:cuid').get(PostController.getPost);
router.route('/posts').post(PostController.addPost);

module.exports = router;
