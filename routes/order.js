// routes/order.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const Order = require('../models/order');
const { authenticateToken } = require('../middleware/auth');

// GET all orders
router.get('/', authenticateToken, (req, res) => {
  db.query('SELECT * FROM order_header', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// GET an order by ID
router.get('/:id', authenticateToken, (req, res) => {
  const orderId = req.params.id;
  db.query('SELECT * FROM order_header WHERE ORDER_ID = ?', orderId, (error, results, fields) => {
    if (error) throw error;
    res.json(results[0]);
  });
});

// POST a new order
router.post('/', authenticateToken, (req, res) => {
  const newOrderData = req.body;
  const newOrder = new Order(newOrderData);
  db.query('INSERT INTO order_header SET ?', newOrder, (error, results, fields) => {
    if (error) throw error;
    res.json({ message: 'Order added successfully!', orderId: results.insertId });
  });
});

// PUT update an order by ID
router.put('/:id', authenticateToken, (req, res) => {
  const orderId = req.params.id;
  const updatedOrderData = req.body;
  const updatedOrder = new Order(updatedOrderData);
  db.query('UPDATE order_header SET ? WHERE ORDER_ID = ?', [updatedOrder, orderId], (error, results, fields) => {
    if (error) throw error;
    res.json({ message: 'Order updated successfully!' });
  });
});

// DELETE an order by ID
router.delete('/:id', authenticateToken, (req, res) => {
  const orderId = req.params.id;
  db.query('DELETE FROM order_header WHERE ORDER_ID = ?', orderId, (error, results, fields) => {
    if (error) throw error;
    res.json({ message: 'Order deleted successfully!' });
  });
});

module.exports = router;
