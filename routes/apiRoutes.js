const express = require('express');
const { readNotes, writeNotes } = require('./store');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/notes', async (req, res) => {
  try {
    const notes = await readNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read notes.' });
  }
});

router.post('/notes', async (req, res) => {
  try {
    const notes = await readNotes();
    const newNote = {
      id: uuidv4(), // Generate a unique ID for the new note
      title: req.body.title,
      text: req.body.text,
    };
    notes.push(newNote);
    await writeNotes(notes);
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save note.' });
  }
});

module.exports = router;