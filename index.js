const express = require('express');
const apiRoutes = require('./server');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const {errorLogs, errorHandler} = require('./middleware/error.handler');


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hola Carlos');
});
app.get('/api/v1/ayuda', (req, res) => {
  res.status(200).send('¡Hola Carlos! ¿En qué puedo ayudarte?');
});
apiRoutes(app);


app.use(errorLogs);
app.use(errorHandler);

app.listen(port, (req, res) => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;