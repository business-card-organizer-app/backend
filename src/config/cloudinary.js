const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const secret = require('./secrets');

cloudinary.config({
    cloud_name: secret.cloudinaryName,
    api_key: secret.cloudinaryApiKey,
    api_secret: secret.cloudinaryApiSecret
});

const err = new Error()
err.message = 'Invalid image type ensure image is either jpg or png'
const storage = cloudinaryStorage({
    cloudinary,
    folder: 'bussiness-card',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true)
        } else {
            cb(err.message, false)
        }
    }
});

const parser = multer({
    storage
});

module.exports = parser.single('user_image');