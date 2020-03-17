const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;

express()
  .use(express.static(path.join(__dirname, 'build')))
  .get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  })
  .listen(port);
