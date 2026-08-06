import { Router } from 'express';
import { uploadController } from '../controllers/upload.controller.js';
import { uploadSingleImage } from '../middlewares/upload.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     FileUploadResponse:
 *       type: object
 *       properties:
 *         filename:
 *           type: string
 *           example: "image-1691234567-123456789.jpg"
 *         originalName:
 *           type: string
 *           example: "pizza.jpg"
 *         mimetype:
 *           type: string
 *           example: "image/jpeg"
 *         size:
 *           type: integer
 *           example: 1024500
 *         path:
 *           type: string
 *           example: "/uploads/image-1691234567-123456789.jpg"
 *         url:
 *           type: string
 *           example: "http://localhost:5000/uploads/image-1691234567-123456789.jpg"
 */

/**
 * @swagger
 * /upload/image:
 *   post:
 *     summary: Upload a single image file (Protected)
 *     tags: [File Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [image]
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload (Max 5MB, JPG/JPEG/PNG/WEBP/GIF)
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Image uploaded successfully"
 *                 data:
 *                   $ref: '#/components/schemas/FileUploadResponse'
 *       400:
 *         description: Invalid file format, size limit exceeded, or missing file
 *       401:
 *         description: Unauthorized
 */
router.post('/image', authenticate, uploadSingleImage('image'), uploadController.uploadImage);

/**
 * @swagger
 * /upload:
 *   delete:
 *     summary: Delete an uploaded image file by path (Protected)
 *     tags: [File Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [imagePath]
 *             properties:
 *               imagePath:
 *                 type: string
 *                 example: "/uploads/image-1691234567-123456789.jpg"
 *     responses:
 *       200:
 *         description: Image file deleted successfully
 *       400:
 *         description: Invalid image path
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Image file not found on server
 */
router.delete('/', authenticate, uploadController.deleteImage);

export default router;
