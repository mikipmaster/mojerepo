const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Dodawanie transakcji
app.post('/api/transactions', (req, res) => {
  const { name, amount, date } = req.body;
  if(!name || !amount || !date) {
    return res.status(400).send('Invalid transaction data');
  }
  const query = 'INSERT INTO transactions (name, amount, date) VALUES (?, ?, ?)';
  db.query(query, [name, amount, date], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.status(201).send({ message: 'Transaction added', id: results.insertId });
  });
});

// Pobieranie wszystkich transakcji
app.get('/api/transactions', (req, res) => {
  const query = 'SELECT * FROM transactions';
  db.query(query, (err, results) => {
    if(err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.status(200).json(results);
  });
});

// Aktualizacja transakcji
app.put('/api/transactions/:id', (req, res) => {
  const id = req.params.id;
  const { name, amount, date } = req.body;
  const query = 'UPDATE transactions SET name = ?, amount = ?, date = ? WHERE id = ?';
  db.query(query, [name, amount, date, id], (err, results) => {
    if(err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.status(200).send('Transaction updated');
  });
});

// Usuwanie transakcji
app.delete('/api/transactions/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM transactions WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if(err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.status(200).send('Transaction deleted');
  });
});

// Przykładowe API ustawień
app.get('/api/settings', (req, res) => {
  res.status(200).json({ theme: 'light' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
