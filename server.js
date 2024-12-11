const express = require('express');
const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port, ${PORT}`);
});

require('./worker');

module.exports = app;
