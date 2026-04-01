const express = require('express');
const { getRecommendations, getCollegeRecommendations, saveRecommendation, getSavedRecommendations } = require('../controllers/recommendation');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getRecommendations);

router.route('/college/:collegeId')
  .get(protect, getCollegeRecommendations);

router.route('/save')
  .post(protect, saveRecommendation);

router.route('/saved')
  .get(protect, getSavedRecommendations);

module.exports = router;