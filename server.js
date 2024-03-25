const express = require('express');
const stringify = require('csv-stringify');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  console.log('hit');
  res.send('Hello World!');
});

app.get('/thingy', (req, res) => {
  res.send('oh no');
});

app.get('/download_map/:param', (req, res) => {
  console.log(req.params);

  res.json({ val: 1234 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});