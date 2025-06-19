const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const eventosRoutes = require('./routes/events');

app.use(express.json());
app.use('/api/events', eventosRoutes);

app.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});

app.get('/',(req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'home.html'));
});