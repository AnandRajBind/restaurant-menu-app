import multer from 'multer';
import path from 'path';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

// Ensure uploads directory path relative to process working directory
const uploadDirectory = path.join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `menu-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        'Invalid file type. Only JPG, JPEG, PNG, and WEBP images are allowed.'
      ),
      false
    );
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB File Size Limit
  },
});

/**
 * Single image upload middleware wrapper handling Multer error delegation cleanly.
 * @param {string} fieldName - Form field name (e.g., 'image')
 */
export const uploadSingleImage = (fieldName) => {
  return (req, res, next) => {
    const uploadHandler = upload.single(fieldName);

    uploadHandler(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(
            new ApiError(
              HTTP_STATUS.BAD_REQUEST,
              'File size limit exceeded. Maximum allowed size is 5MB.'
            )
          );
        }
        return next(
          new ApiError(HTTP_STATUS.BAD_REQUEST, `File upload error: ${err.message}`)
        );
      } else if (err) {
        return next(err);
      }
      next();
    });
  };
};
