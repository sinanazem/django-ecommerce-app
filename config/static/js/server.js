const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'eduportMain' directory
app.use(express.static(path.join(__dirname, '..',)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'eduportMain', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
