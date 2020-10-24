const express = require("express");
const router = express.Router();
const note = require("../models/note.model");
const m = require("../helpers/middlewares");

router.get("/", async (req, res) => {
  await note
    .getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

router.get("/:id", m.mustBeInteger, async (req, res) => {
  const id = req.params.id;
  await note
    .getNote(id)
    .then((note) => res.json(note))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

router.post("/", m.checkFieldsNote, async (req, res) => {
  await note
    .insertNote(req.body)
    .then((note) =>
      res.status(201).json({
        message: `The note #${note.id} has been created`,
        content: note,
      })
    )
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.put("/:id", m.mustBeInteger, m.checkFieldsNote, async (req, res) => {
  const id = req.params.id;
  await note
    .updateNote(id, req.body)
    .then((note) =>
      res.json({
        message: `The note #${id} has been updated`,
        content: note,
      })
    )
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:id", m.mustBeInteger, async (req, res) => {
  const id = req.params.id;

  await note
    .deleteNote(id)
    .then((note) =>
      res.json({
        message: `The note #${id} has been deleted`,
      })
    )
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
