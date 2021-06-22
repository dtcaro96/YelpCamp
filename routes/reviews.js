const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedOn, isReviewAuthor } = require('../middleware.js')
const reviews = require('../controllers/reviews')
const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedOn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedOn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;