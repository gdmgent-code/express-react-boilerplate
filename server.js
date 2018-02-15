const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const settings = require('./server/config/settings');
const apiRoutes = require('./server/api/api.routes');

// Settings
const port = process.env.PORT || 5000;
const mongodbUrl = process.env.MONGODB_URL;

// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(mongodbUrl);

// Initialize the server
const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', apiRoutes);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});
const server = http.createServer(app);
server.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port: ${port}! Build something amazing!`);
  }
});
