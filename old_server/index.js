const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Prepare server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Add routes
const albums = require('./routes/api/albums');

app.use('/api/albums', albums);

// Start sever
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));