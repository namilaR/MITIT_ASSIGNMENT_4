/**
 * Created by namila on 6/3/17.
 */
var multer  = require('multer');

multer.storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/' + file.fieldname + '/');
    },
    filename: function (req, file, cb) {
        var filename = file.originalname;
        var fileExtension = filename.split(".")[1];
        cb(null, filename);
    }
})

multer.upload = multer({ storage: multer.storage });