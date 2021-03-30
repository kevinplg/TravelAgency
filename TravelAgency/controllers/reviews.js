// requrir schemas
const Review = require('../models/review');
const Package = require('../models/package');

module.exports.new = async(req, res) => {
    const package = await Package.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    package.reviews.push(review);
    await review.save();
    await package.save();
    req.flash('success', 'Successfully created a new review!');
    res.redirect(`/package/${package._id}`);
}

module.exports.delete = async(req, res) => {
    const { id, reviewId } = req.params;
    await Package.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/package/${id}`);
}