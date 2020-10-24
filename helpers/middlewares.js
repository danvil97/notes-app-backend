function mustBeInteger(req, res, next) {
  const id = req.params.id;
  if (!Number.isInteger(parseInt(id))) {
    res.status(400).json({ message: "ID must be an integer" });
  } else {
    next();
  }
}
function checkFieldsNote(req, res, next) {
  const { text } = req.body;
  // if (text) {
  next();
  // } else {
  //   res.status(400).json({ message: "There is a problem with fields" });
  // }
}
module.exports = {
  mustBeInteger,
  checkFieldsNote,
};
