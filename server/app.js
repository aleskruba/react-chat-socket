const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const expressPort = 3500; // Port for the Express app
app.listen(expressPort, () => {
  console.log(`Express app listening on port ${expressPort}`);
});
