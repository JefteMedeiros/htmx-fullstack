const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});