const express = require('express');
const app = express();
const port = 8123;
const routes = require('./routes');

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes defined in routes/index.js
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
