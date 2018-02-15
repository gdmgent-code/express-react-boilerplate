/**
 * Get hello
 * @param req
 * @param res
 * @returns void
 */
function getHello(req, res) {
  res.json({ message: 'Welcome to New Media Development!' });
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
    { firstname: 'Philippe', lastname: 'De Pauw - Waterschoot' },
    { firstname: 'Dieter', lastname: 'De Weirdt' },
    { firstname: 'Olivier', lastname: 'Parent' },
    { firstname: 'Evelien', lastname: 'Rutsaert' },
  ]);
}
module.exports.getLecturers = getLecturers;
