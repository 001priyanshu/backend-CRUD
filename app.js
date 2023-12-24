// app.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.use('/persons', require('./routes/person'));
app.use('/orders', require('./routes/order'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
