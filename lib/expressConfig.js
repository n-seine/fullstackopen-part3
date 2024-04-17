require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT;
morgan.token('data', (req) => JSON.stringify(req.body));

// Use middlewares
app.use(cors());
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data '),
);
app.use(express.static('dist'));
app.listen(port, () => console.log(`Example app listening on port ${port}`));

module.exports = app;
