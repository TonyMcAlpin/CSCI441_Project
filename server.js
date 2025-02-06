const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


//static files
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>console.log(`Sever running on ${PORT}`));