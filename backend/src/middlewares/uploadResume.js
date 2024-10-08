const multer = require("multer");
const ApiError = require("../utils/apiError");
const path = require("path");
const multerOption = () => {
	const multerStorage = multer.memoryStorage();
	const filterImage = function (req, file, cb) {
		const ext = path.extname(file.originalname);
		const allowed = [".pdf", ".doc", "docx", ".odt"];
		if (allowed.includes(ext)) {
			cb(null, true);
		} else {
			cb(new ApiError(`Only File are possible `, 400), false);
		}
	};
	const upload = multer({ storage: multerStorage, fileFilter: filterImage });
	return upload;
};

exports.uploadFile = (fieldName) => multerOption().single(fieldName);
