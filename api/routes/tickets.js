const express = require('express');
const router = express.Router();

const ticketsService = require('../services/tickets');

router.get('/:clientId', async (req, res, next) => {
  try {
    const tickets = await ticketsService.getClientTickets(req.params.clientId);
    res.json(tickets);
  } catch (error) {
    next(error);
  }
});

router.post('/buy/:flightId', async (req, res, next) => {
  try {
    const response = await ticketsService.buyTicket(
      req.params.flightId,
      req.body.clientId
    );

    if (response) {
      res.status(200).json();
    }

    res.status(400).json();
  } catch (error) {
    next(error);
  }
});

router.post('/cancel/:ticketId', async (req, res, next) => {
  try {
    const response = await ticketsService.cancelFlight(
      req.params.ticketId,
      req.body.flightId,
      req.body.clientId
    );

    if (response) {
      res.status(200).json();
    }

    res.status(400).json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
