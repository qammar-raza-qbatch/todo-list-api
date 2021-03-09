const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./Routes/getTasks');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/tasks", taskRoutes);

app.use((req, res, next) => {
  res.status(422).json({ message: 'Fetched failed' })
})

mongoose.connect('mongodb://localhost/to-do-app').then(() => {
  app.listen(8080);
  console.log('connected to the database')
}).catch((err) => {
  console.log('conncetion to the database failed: ', err)
})