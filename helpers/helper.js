const fs = require("fs");

const getNewId = () => Date.now();

const newDate = () => new Date().toString();

// TODO: Refactor this funcion for more readable one
function mustBeInArray(array, id) {
  return new Promise((resolve, reject) => {
    const row = array.find((r) => r.id == id);
    if (!row) {
      reject({
        message: `Can't find this id (${id})`,
        status: 404,
      });
    }
    resolve(row);
  });
}

function writeJSONFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8");
}

module.exports = {
  getNewId,
  newDate,
  mustBeInArray,
  writeJSONFile,
};
