const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validatePackage } = require('../middleware');
const package = require('../controllers/package');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(package.index))
    .post(isLoggedIn, upload.array('image'), validatePackage, catchAsync(package.newPost));

router.get('/new', isLoggedIn, package.newGet);
router.get('/booking', isLoggedIn, package.booking);

router.route('/:id')
    .get(catchAsync(package.show))
    .put(isLoggedIn, isAuthor, upload.array('image'), validatePackage, catchAsync(package.editPost))
    .delete(isLoggedIn, isAuthor, catchAsync(package.delete));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(package.editGet));

router.get('/:id/price', isLoggedIn, catchAsync(package.price));

module.exports = router;