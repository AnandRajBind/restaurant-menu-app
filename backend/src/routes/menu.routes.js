import { Router } from 'express';
import { menuController } from '../controllers/menu.controller.js';
import {
  createMenuValidator,
  updateMenuValidator,
  mongoIdParamValidator,
  queryMenuValidator,
} from '../validators/menu.validator.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js';
import { uploadSingleImage } from '../middlewares/upload.middleware.js';
import { ROLES } from '../constants/roles.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64b8f1a2c9e4a80012a3b999"
 *         name:
 *           type: string
 *           example: "Margherita Pizza"
 *         description:
 *           type: string
 *           example: "Classic Italian pizza with fresh mozzarella, basil, and tomato sauce"
 *         price:
 *           type: number
 *           example: 14.99
 *         category:
 *           type: string
 *           example: "Mains"
 *         image:
 *           type: string
 *           example: "/uploads/image-1691234567-123456.jpg"
 *         available:
 *           type: boolean
 *           example: true
 *         createdBy:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "64b8f1a2c9e4a80012a3b4c5"
 *             name:
 *               type: string
 *               example: "Admin User"
 *             email:
 *               type: string
 *               example: "admin@restaurant.com"
 *         createdAt:
 *           type: string
 *           example: "2026-08-06T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           example: "2026-08-06T00:00:00.000Z"
 *     MenuPagination:
 *       type: object
 *       properties:
 *         totalItems:
 *           type: integer
 *           example: 25
 *         totalPages:
 *           type: integer
 *           example: 3
 *         currentPage:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 10
 *         hasNextPage:
 *           type: boolean
 *           example: true
 *         hasPrevPage:
 *           type: boolean
 *           example: false
 *     MenuListResult:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MenuItem'
 *         pagination:
 *           $ref: '#/components/schemas/MenuPagination'
 */

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Create a new restaurant menu item (Admin Only)
 *     description: Creates a new menu item with optional image file upload.
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, description, price, category]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Margherita Pizza"
 *               description:
 *                 type: string
 *                 example: "Classic Italian pizza with fresh mozzarella, basil, and tomato sauce"
 *               price:
 *                 type: number
 *                 example: 14.99
 *               category:
 *                 type: string
 *                 example: "Mains"
 *               available:
 *                 type: boolean
 *                 example: true
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional image file (Max 5MB)
 *     responses:
 *       201:
 *         description: Menu item created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Menu item created successfully"
 *               data:
 *                 _id: "64b8f1a2c9e4a80012a3b999"
 *                 name: "Margherita Pizza"
 *                 description: "Classic Italian pizza with fresh mozzarella, basil, and tomato sauce"
 *                 price: 14.99
 *                 category: "Mains"
 *                 image: "/uploads/image-1691234567-123456.jpg"
 *                 available: true
 *                 createdBy:
 *                   _id: "64b8f1a2c9e4a80012a3b4c5"
 *                   name: "Admin User"
 *                   email: "admin@restaurant.com"
 *                 createdAt: "2026-08-06T00:00:00.000Z"
 *                 updatedAt: "2026-08-06T00:00:00.000Z"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
  '/',
  authenticate,
  authorizeRoles(ROLES.ADMIN),
  uploadSingleImage('image'),
  createMenuValidator,
  validate,
  menuController.createMenu
);

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Get paginated menu items with search, filters, and sorting (Public)
 *     description: Returns a paginated list of menu items supporting keyword search, category filtering, availability status, price/date sorting.
 *     tags: [Menu]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: "pizza"
 *         description: Keyword search across item name or description
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         example: "Mains"
 *         description: Filter by menu category
 *       - in: query
 *         name: available
 *         schema:
 *           type: boolean
 *         example: true
 *         description: Filter by availability status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [price:asc, price:desc, name:asc, name:desc, createdAt:asc, createdAt:desc]
 *         example: "price:asc"
 *         description: Sort criteria (default createdAt:desc)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         example: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Menu items list retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Menu items retrieved successfully"
 *               data:
 *                 items:
 *                   - _id: "64b8f1a2c9e4a80012a3b999"
 *                     name: "Margherita Pizza"
 *                     description: "Classic Italian pizza with fresh mozzarella, basil, and tomato sauce"
 *                     price: 14.99
 *                     category: "Mains"
 *                     image: "/uploads/image-1691234567-123456.jpg"
 *                     available: true
 *                     createdBy:
 *                       _id: "64b8f1a2c9e4a80012a3b4c5"
 *                       name: "Admin User"
 *                       email: "admin@restaurant.com"
 *                     createdAt: "2026-08-06T00:00:00.000Z"
 *                     updatedAt: "2026-08-06T00:00:00.000Z"
 *                 pagination:
 *                   totalItems: 25
 *                   totalPages: 3
 *                   currentPage: 1
 *                   limit: 10
 *                   hasNextPage: true
 *                   hasPrevPage: false
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', queryMenuValidator, validate, menuController.getAllMenu);

/**
 * @swagger
 * /menu/{id}:
 *   get:
 *     summary: Get single menu item by ID (Public)
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "64b8f1a2c9e4a80012a3b999"
 *     responses:
 *       200:
 *         description: Menu item retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Menu item retrieved successfully"
 *               data:
 *                 _id: "64b8f1a2c9e4a80012a3b999"
 *                 name: "Margherita Pizza"
 *                 description: "Classic Italian pizza with fresh mozzarella, basil, and tomato sauce"
 *                 price: 14.99
 *                 category: "Mains"
 *                 image: "/uploads/image-1691234567-123456.jpg"
 *                 available: true
 *                 createdBy:
 *                   _id: "64b8f1a2c9e4a80012a3b4c5"
 *                   name: "Admin User"
 *                   email: "admin@restaurant.com"
 *                 createdAt: "2026-08-06T00:00:00.000Z"
 *                 updatedAt: "2026-08-06T00:00:00.000Z"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', mongoIdParamValidator, validate, menuController.getMenuById);

/**
 * @swagger
 * /menu/{id}:
 *   put:
 *     summary: Update an existing menu item (Admin Only)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "64b8f1a2c9e4a80012a3b999"
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Supreme Margherita Pizza"
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 example: 16.99
 *               category:
 *                 type: string
 *               available:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Menu item updated successfully"
 *               data:
 *                 _id: "64b8f1a2c9e4a80012a3b999"
 *                 name: "Supreme Margherita Pizza"
 *                 price: 16.99
 *                 category: "Mains"
 *                 image: "/uploads/image-1691234567-999999.jpg"
 *                 available: true
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put(
  '/:id',
  authenticate,
  authorizeRoles(ROLES.ADMIN),
  uploadSingleImage('image'),
  updateMenuValidator,
  validate,
  menuController.updateMenu
);

/**
 * @swagger
 * /menu/{id}:
 *   delete:
 *     summary: Delete a menu item by ID (Admin Only)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "64b8f1a2c9e4a80012a3b999"
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Menu item deleted successfully"
 *               data:
 *                 id: "64b8f1a2c9e4a80012a3b999"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete(
  '/:id',
  authenticate,
  authorizeRoles(ROLES.ADMIN),
  mongoIdParamValidator,
  validate,
  menuController.deleteMenu
);

export default router;
