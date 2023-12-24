// routes/person.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const Person = require('../models/person');
const { authenticateToken } = require('../middleware/auth');

// GET all persons
router.get('/', authenticateToken, (req, res) => {
  db.query('SELECT * FROM person', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// POST a new person
router.post('/', authenticateToken, (req, res) => {
  const newPersonData = req.body;
  const newPerson = new Person(newPersonData);
  db.query('INSERT INTO person SET ?', newPerson, (error, results, fields) => {
    if (error) throw error;
    res.json({ message: 'Person added successfully!', personId: results.insertId });
  });
});

// PUT update a person by ID
router.put('/:id', authenticateToken, (req, res) => {
  const personId = req.params.id;
  const updatedPersonData = req.body;
  const updatedPerson = new Person(updatedPersonData);
  db.query('UPDATE person SET ? WHERE PARTY_ID = ?', [updatedPerson, personId], (error, results, fields) => {
    if (error) throw error;
    res.json({ message: 'Person updated successfully!' });
  });
});

// DELETE a person by ID
router.delete('/:id', authenticateToken, (req, res) => {
  const personId = req.params.id;
  db.query('DELETE FROM person WHERE PARTY_ID = ?', personId, (error, results, fields) => {
    if (error) throw error;
    res.json({ message: 'Person deleted successfully!' });
  });
});

module.exports = router;
