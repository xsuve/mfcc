const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const port = 3001;

const flightsRouter = require('./routes/flights');
const ticketsRouter = require('./routes/tickets');
const companiesRouter = require('./routes/companies');

app.get('/', (_, res) => {
  res.json({ message: 'ok' });
});

app.use('/flights', flightsRouter);
app.use('/tickets', ticketsRouter);
app.use('/companies', companiesRouter);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  console.error(error.message, error.stack);
  res.status(statusCode).json({ message: error.message });

  return;
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
