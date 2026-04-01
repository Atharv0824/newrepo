const express = require('express');
const { body } = require('express-validator');
const { getAllColleges, getCollegeById, createCollege, updateCollege, deleteCollege, searchColleges } = require('../controllers/college');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(searchColleges)
  .post(protect, authorize('admin', 'counsellor'), [
    body('name').trim().notEmpty().withMessage('College name is required'),
    body('type').notEmpty().withMessage('College type is required'),
    body('location.city').notEmpty().withMessage('City is required'),
    body('location.state').notEmpty().withMessage('State is required')
  ], createCollege);

router.route('/:id')
  .get(getCollegeById)
  .put(protect, authorize('admin', 'counsellor'), updateCollege)
  .delete(protect, authorize('admin'), deleteCollege);

module.exports = router;