import express from "express";
import ReviewsCtrl from "./reviews.controller.js"

//when going on url it route request on different parts of application
const router = express.Router();

router.route('/movie/:id').get(ReviewsCtrl.apiGetReviews);
router.route('/new').post(ReviewsCtrl.apiPostReview);
router.route('/:id')
        .get(ReviewsCtrl.apiGetReview)
        .put(ReviewsCtrl.apiUpdateReview)
        .delete(ReviewsCtrl.apiDeleteReview);

export default router;