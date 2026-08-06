import multer from 'multer';
import path from 'path';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

// Ensure uploads directory path relative to application working directory
const uploadDirectory = path.join(process.cwd(), 'uploads');

/**
 * Configure Multer disk storage engine
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `image-${uniqueSuffix}${ext}`);
  },
});

/**
 * File filter to enforce allowed image extensions & mime-types
 */
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        `Invalid file format '${ext}'. Allowed extensions: ${allowedExtensions.join(', ')}`
      ),
      false
    );
  }
};

/**
 * Multer upload instance configured with 5MB max file size limit
 */
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB File Size Limit
  },
});

/**
 * Reusable single file upload middleware wrapper handling Multer error delegation.
 * @param {string} [fieldName='image'] - Form-data key name
 */
export const uploadSingleImage = (fieldName = 'image') => {
  return (req, res, next) => {
    const uploadHandler = upload.single(fieldName);

    uploadHandler(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(
            new ApiError(
              HTTP_STATUS.BAD_REQUEST,
              'File size limit exceeded. Maximum allowed file size is 5MB.'
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
