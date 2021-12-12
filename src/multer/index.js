const path = require('path'); // for getting file extension
const multer = require('multer'); // for uploading files

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => { // setting destination of uploading files        
      if (file.fieldname === "cv") { // if uploading resume
        cb(null, path.join(__dirname, '../../uploads/'));
      } else { // else uploading image
        cb(null, path.join(__dirname, '../../uploads/'));
      }
    },
    filename: (req, file, cb) => { // naming file
      cb(null, file.fieldname);
    }
});

const fileFilter = (req, file, cb) => {
if (file.fieldname === "cv") { // if uploading resume
    if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) { // check file type to be pdf, doc, or docx
    cb(null, true);
    } else {
    cb(null, false); // else fails
    }
} else { // else uploading image
    if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
    ) { // check file type to be png, jpeg, or jpg
    cb(null, true);
    } else {
    cb(null, false); // else fails
    }
}
};

const uploadUser =
	multer(
	  { 
		storage: fileStorage, 
		limits:
		  { 
			fileSize:'2mb' 
		  }, 
		fileFilter: fileFilter 
	  }
	).fields(
	  [
		{ 
		  name: 'cv', 
		  maxCount: 1 
		}, 
		{ 
		  name: 'image', 
		  maxCount: 1 
		}
	  ]
	)

  const uploadApplicationFile =
	multer(
	  { 
		storage: fileStorage, 
		limits:
		  { 
			fileSize:'5mb' 
		  }, 
		fileFilter: fileFilter 
	  }
	).single("image")
module.exports = {uploadUser, uploadApplicationFile}