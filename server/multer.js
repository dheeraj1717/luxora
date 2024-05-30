const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split('.')[0];
    const extension = path.extname(file.originalname);
    cb(null, filename + '-' + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

exports.upload = upload;
