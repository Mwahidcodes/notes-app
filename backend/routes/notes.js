const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET all notes
router.get('/', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// POST new note
router.post('/', async (req, res) => {
  const note = new Note(req.body);
  const saved = await note.save();
  res.json(saved);
});

// DELETE note
router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
//edit all notes
router.put('/:id', async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;