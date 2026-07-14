const express = require('express');
const path = require('path');
const app = express();

// Serve the static dark-themed frontend files from the root directory
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
