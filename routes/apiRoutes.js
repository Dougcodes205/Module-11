const express = require('express');
const { readNotes, writeNotes } = require('./store');

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
      id: notes.length + 1,
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

router.delete('/notes/:id', async (req, res) => {
  try {
    const notes = await readNotes();
    const noteId = parseInt(req.params.id);
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    await writeNotes(updatedNotes);
    res.json({ message: 'Note deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note.' });
  }
});

module.exports = router;