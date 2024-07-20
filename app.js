const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/blogApp',).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.static('public'));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
