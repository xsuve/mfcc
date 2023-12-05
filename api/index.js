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

const ticketsRouter = require('./routes/tickets');

app.get('/', (_, res) => {
  res.json({ message: 'ok' });
});

app.use('/tickets', ticketsRouter);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  console.error(error.message, error.stack);
  res.status(statusCode).json({ message: error.message });

  return;
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
