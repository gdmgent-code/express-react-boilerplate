const Post = require('../models/post.model');
const cuid = require('cuid');
const slugify = require('slugify');
const sanitizeHtml = require('sanitize-html');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}
module.exports.getPosts = getPosts;

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
function addPost(req, res) {
  if (!req.body.post.title || !req.body.post.synopsis || !req.body.post.body) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slugify(newPost.title.toLowerCase());
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}
module.exports.addPost = addPost;

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}
module.exports.getPost = getPost;

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
module.exports.deletePost = deletePost;
