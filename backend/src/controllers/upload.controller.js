import { uploadService } from '../services/upload.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

class UploadController {
  /**
   * Upload single image file
   * POST /api/v1/upload/image
   */
  uploadImage = asyncHandler(async (req, res) => {
    const fileData = uploadService.processUploadedFile(req.file, req);

    return res.status(HTTP_STATUS.CREATED).json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        fileData,
        'Image uploaded successfully'
      )
    );
  });

  /**
   * Delete uploaded image file by path
   * DELETE /api/v1/upload
   */
  deleteImage = asyncHandler(async (req, res) => {
    const imagePath = req.body?.imagePath || req.query?.imagePath;
    const result = await uploadService.deleteImageFile(imagePath);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(HTTP_STATUS.OK, result, result.message)
    );
  });
}

export const uploadController = new UploadController();
