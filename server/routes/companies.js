const express = require('express');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company');
const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token required');
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).send('Invalid token');
  }
};

router.get('/', async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

router.post('/', verifyToken, async (req, res) => {
  const newCompany = new Company(req.body);
  await newCompany.save();
  res.json(newCompany);
});

router.put('/:id', verifyToken, async (req, res) => {
  const updated = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', verifyToken, async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;