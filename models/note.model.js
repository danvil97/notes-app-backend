const filename = "../data/notes.json";
const fsfilename = "./data/notes.json";
const helper = require("../helpers/helper.js");

let notes = require(filename);

function getNotes() {
  return new Promise((resolve, reject) => {
    if (notes.length === 0) {
      reject({
        message: "No notes available",
        status: 202,
      });
    }
    resolve(notes);
  });
}
function getNote(id) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(notes, id)
      .then((note) => resolve(note))
      .catch((err) => reject(err));
  });
}
function insertNote(newNote) {
  return new Promise((resolve, reject) => {
    const id = { id: helper.getNewId() };
    newNote = { ...id, ...newNote };
    notes.push(newNote);
    helper.writeJSONFile(fsfilename, notes);
    resolve(newNote);
  });
}
function updateNote(id, newNote) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(notes, id)
      .then((note) => {
        const index = notes.findIndex((n) => n.id == note.id);
        id = { id: note.id };
        notes[index] = { ...id, ...newNote };
        helper.writeJSONFile(fsfilename, notes);
        resolve(notes[index]);
      })
      .catch((err) => reject(err));
  });
}
function deleteNote(id) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(notes, id)
      .then(() => {
        notes = notes.filter((n) => n.id != id);
        helper.writeJSONFile(fsfilename, notes);
        resolve();
      })
      .catch((err) => reject(err));
  });
}
module.exports = {
  insertNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};
