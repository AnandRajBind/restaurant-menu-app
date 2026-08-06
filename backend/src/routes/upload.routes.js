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
 *     description: Accepts multipart/form-data image file (Max 5MB) and returns relative path & absolute URL.
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
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Image uploaded successfully"
 *               data:
 *                 filename: "image-1691234567-123456789.jpg"
 *                 originalName: "pizza.jpg"
 *                 mimetype: "image/jpeg"
 *                 size: 1024500
 *                 path: "/uploads/image-1691234567-123456789.jpg"
 *                 url: "http://localhost:5000/uploads/image-1691234567-123456789.jpg"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/image', authenticate, uploadSingleImage('image'), uploadController.uploadImage);

/**
 * @swagger
 * /upload:
 *   delete:
 *     summary: Delete an uploaded image file by path (Protected)
 *     description: Safely removes specified local image file from the /uploads directory.
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
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Image file deleted successfully"
 *               data:
 *                 message: "Image file deleted successfully"
 *                 imagePath: "/uploads/image-1691234567-123456789.jpg"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/', authenticate, uploadController.deleteImage);

export default router;
