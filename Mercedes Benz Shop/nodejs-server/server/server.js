const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/asus_shop';

//File Uploading System
var multer = require('multer');
var image_filename;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../nginx/html/images/');
    },
    filename: function (req, file, cb) {
		image_filename = file.originalname;
        cb(null, image_filename);
    }
});
var upload = multer({
    storage: storage
});


module.exports = router;
