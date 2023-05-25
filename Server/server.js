const express = require('express');
const { json, urlencoded } = require('express');
const path = require('path');
const cors = require('cors');
const api = require('./routes/api');
const dbConfig = require('./config/dbconfig')();
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3100;

app.use(json());
app.use(cors());
app.get('/', (req, res) => {
    res.send(' server is running...');
})
app.use(urlencoded({ extended: false }));

// app.use(cookieParser());

// app.get('/', (req, res) => {
  
//   const token = req.cookies.jwt;

//   // Verify the JWT token.
//   if (!jwt.verify(token, "SecretToken")) {
//     res.sendStatus(401);
//     return;
//   }

//   res.send({
//     message: 'You are authenticated!'
//   });
// });

app.use(cookieParser());


app.use('/api', api);

app.listen(PORT, () => {
    console.log(`Server started at port : ${PORT}`);
})
