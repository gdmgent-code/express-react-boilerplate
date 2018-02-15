const mongoose = require('mongoose');
const cuid = require('cuid');
const slugify = require('slugify');
const sanitizeHtml = require('sanitize-html');
const async = require('async');

const Post = require('./server/api/v1/models/post.model');

console.log('This script populates some test posts to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return;
}

const mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const posts = [];

function postCreate(title, synopsis, body, cb) {
  const postDetail = {
    title: title,
    synopsis: synopsis,
    body: body,
  };

  const newPost = new Post(postDetail);
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.synopsis);
  newPost.content = sanitizeHtml(newPost.body);
  newPost.slug = slugify(newPost.title.toLowerCase());
  newPost.cuid = cuid();
       
  newPost.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Post: ' + newPost);
    posts.push(newPost);
    cb(null, newPost);
  });
}

function createPosts(cb) {
    async.parallel([
        function(callback) {
          postCreate('Patrick', 'Rothfuss', '1973-06-06', callback);
        }
        ],
        // optional callback
        cb);
}

// Seed all objects in serie
async.series([
    createPosts
],
// Optional callback
function(err, results) {
    if (err) {
        console.log(`FINAL ERR: ${err}`);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
