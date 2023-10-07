const express = require('express');
const router = express.Router();

router.get('/some-endpoint', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

module.exports = router;