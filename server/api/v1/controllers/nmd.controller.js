'use strict';

/**
 * Get hello
 * @param req
 * @param res
 * @returns void
 */
function getHello(req, res) {
  res.json({ 'message': 'Welcome to New Media Development!'});
}
module.exports.getHello = getHello;

/**
 * Get hello
 * @param req
 * @param res
 * @returns void
 */
function getLecturers(req, res) {
  res.json([
    { 'firstname': 'Philippe', 'lastname': 'De Pauw - Waterschoot' }
  ]);
}
module.exports.getLecturers = getLecturers;