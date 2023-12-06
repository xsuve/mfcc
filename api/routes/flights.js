const express = require('express');
const router = express.Router();

const flightService = require('../services/flights');

router.get('/', async (req, res, next) => {
  try {
    const flights = await flightService.getAllFlights();
    res.json(flights);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const flight = await flightService.getFlight(req.params.id);
    res.json(flight);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const flight = await flightService.createFlight(req.body);

    if (flight) {
      res.status(200).json(flight);
    }

    res.status(500).json();
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const flight = await flightService.editFlight(req.params.id, req.body);

    if (flight) {
      res.status(200).json(flight);
    }

    res.status(500).json();
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const response = await flightService.deleteFlight(req.params.id);

    if (response) {
      res.status(200).json();
    }

    res.status(500).json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
