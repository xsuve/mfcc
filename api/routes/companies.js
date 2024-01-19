const express = require('express');
const router = express.Router();

const companiesService = require('../services/companies');

router.get('/', async (req, res, next) => {
  try {
    const companies = await companiesService.getAllCompanies();
    res.json(companies);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const company = await companiesService.getCompany(req.params.id);
    res.json(company);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const company = await companiesService.createCompany(req.body);

    if (company) {
      res.status(200).json(company);
    }

    res.status(400).json();
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const company = await companiesService.editCompany(req.params.id, req.body);

    if (company) {
      res.status(200).json(company);
    }

    res.status(400).json();
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const response = await companiesService.deleteCompany(req.params.id);

    if (response) {
      res.status(200).json();
    }

    res.status(400).json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
