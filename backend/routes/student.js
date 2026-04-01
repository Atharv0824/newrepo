const express = require('express');
const { body } = require('express-validator');
const { getStudentProfile, updateStudentProfile, createStudentProfile, getSavedColleges, saveCollege, removeSavedCollege, getAppliedColleges, applyToCollege, getRecommendationHistory } = require('../controllers/student');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getStudentProfile)
  .post(protect, [
    body('academicStream').notEmpty().withMessage('Academic stream is required'),
    body('marks').isFloat({ min: 0, max: 100 }).withMessage('Marks must be between 0 and 100'),
    body('preferredRegion').notEmpty().withMessage('Preferred region is required')
  ], createStudentProfile)
  .put(protect, [
    body('academicStream').optional().notEmpty(),
    body('marks').optional().isFloat({ min: 0, max: 100 }),
    body('preferredRegion').optional().notEmpty()
  ], updateStudentProfile);

router.route('/saved')
  .get(protect, getSavedColleges)
  .post(protect, body('collegeId').notEmpty().withMessage('Valid college ID is required'), saveCollege);

router.route('/saved/:collegeId')
  .delete(protect, removeSavedCollege);

router.route('/applied')
  .get(protect, getAppliedColleges)
  .post(protect, body('collegeId').notEmpty().withMessage('Valid college ID is required'), applyToCollege);

router.route('/recommendations')
  .get(protect, getRecommendationHistory);

module.exports = router;