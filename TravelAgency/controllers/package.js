const Package = require('../models/package');
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async(req, res) => {
    const package = await Package.find({});
    res.render('package/index', { package })
}

module.exports.newGet = (req, res) => {
    res.render('package/new')
}
module.exports.newPost = async(req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.package.location,
        limit: 1
    }).send();
    const package = new Package(req.body.package);
    package.geometry = geoData.body.features[0].geometry;
    package.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    package.author = req.user._id;
    await package.save();
    req.flash('success', 'Successfully create a new travel package!');
    res.redirect(`/package/${package._id}`)
}

module.exports.show = async(req, res) => {
    const { id } = req.params;
    const package = await Package.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author',
        }
    }).populate('author');
    if (!package) {
        req.flash('error', 'Cannot find that package!');
        return res.redirect('/package');
    }
    res.render('package/show', { package })
}

module.exports.editGet = async(req, res) => {
    const { id } = req.params;
    const package = await Package.findById(id);
    if (!package) {
        req.flash('error', 'Cannot find that package!');
        return res.redirect('/package');
    }
    res.render('package/edit', { package })
}
module.exports.editPost = async(req, res) => {
    const { id } = req.params;
    const package = await Package.findByIdAndUpdate(id, req.body.package, { runValidators: true, new: true });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    package.images.push(...imgs);
    await package.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await package.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated travel package!');
    res.redirect(`/package/${package._id}`);
}

module.exports.delete = async(req, res) => {
    const { id } = req.params;
    const deletedPackage = await Package.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted package!');
    res.redirect('/package');
}

module.exports.price = async(req, res) => {
    const { id } = req.params;
    const package = await Package.findById(id);
    res.render('package/price', { package })
}

module.exports.booking = async(req, res) => {
    res.render('package/booking')
}