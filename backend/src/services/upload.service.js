import fs from 'fs/promises';
import path from 'path';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

class UploadService {
  /**
   * Processes uploaded image file metadata and resolves relative path and full public URL.
   * @param {object} file - Multer file object
   * @param {object} req - Express request object
   * @returns {object} Uploaded file details
   */
  processUploadedFile(file, req) {
    if (!file) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        'No image file provided. Please attach a valid image in the request payload.'
      );
    }

    const relativePath = `/uploads/${file.filename}`;
    const host = req.get('host');
    const protocol = req.protocol;
    const fullUrl = `${protocol}://${host}${relativePath}`;

    return {
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: relativePath,
      url: fullUrl,
    };
  }

  /**
   * Deletes a local image file from storage by relative path.
   * @param {string} imagePath - Relative path (e.g., '/uploads/image-123.jpg')
   * @returns {Promise<object>} Result message
   */
  async deleteImageFile(imagePath) {
    if (!imagePath || typeof imagePath !== 'string') {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        'Image path is required for deletion.'
      );
    }

    // Security check to prevent directory traversal
    const normalizedPath = path.normalize(imagePath).replace(/^(\.\.[\/\\])+/, '');
    
    // Ensure path belongs to uploads folder
    if (!normalizedPath.includes('uploads')) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        'Invalid image path. Only files in the uploads directory can be deleted.'
      );
    }

    // Do not delete default placeholder image
    if (normalizedPath.includes('default-food')) {
      return { message: 'Default placeholder image preserved.', imagePath };
    }

    const cleanRelativePath = normalizedPath.startsWith('/')
      ? normalizedPath
      : `/${normalizedPath}`;
    const fullFileSystemPath = path.join(process.cwd(), cleanRelativePath);

    try {
      // Check file existence
      await fs.stat(fullFileSystemPath);
    } catch (error) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        `Image file '${cleanRelativePath}' not found on server.`
      );
    }

    try {
      // Delete file from disk
      await fs.unlink(fullFileSystemPath);
      return {
        message: 'Image file deleted successfully',
        imagePath: cleanRelativePath,
      };
    } catch (error) {
      throw new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        `Failed to delete image file: ${error.message}`
      );
    }
  }
}

export const uploadService = new UploadService();
