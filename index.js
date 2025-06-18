const express = require('express');
const app = express();
const port = 3000;

const eventosRoutes = require('./routes/events');

app.use(express.json());
app.use('/api/events', eventosRoutes);


app.listen(port, function () {
  console.log('Servidor corriendo en http://localhost:' + port);
});
