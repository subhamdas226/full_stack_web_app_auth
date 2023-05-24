const express = require('express');
const { json, urlencoded } = require('express');
const path = require('path');
const cors = require('cors');
const api = require('./routes/api');
const dbConfig = require('./config/dbconfig')();
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3100;

app.use(json());
app.use(cors());
app.get('/', (req, res) => {
    res.send(' server is running...');
})
app.use(urlencoded({ extended: false }));
// app.use( express.json() );
app.use('/api', api);

app.listen(PORT, () => {
    console.log(`Server started at port : ${PORT}`);
})
