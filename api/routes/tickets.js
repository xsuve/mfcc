const express = require('express');
const router = express.Router();

const ticketsService = require('../services/tickets');

router.get('/', async (req, res, next) => {
  try {
    res.json(await ticketsService.getAll());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
