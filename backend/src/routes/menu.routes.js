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
 *           example: "/uploads/menu-1691234567-123456.jpg"
 *         available:
 *           type: boolean
 *           example: true
 *         createdBy:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
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
 */

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Create a new restaurant menu item (Admin Only)
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
 *     responses:
 *       201:
 *         description: Menu item created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin role required)
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
 *     tags: [Menu]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword for name or description
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by menu category (e.g., Mains, Appetizers, Beverages)
 *       - in: query
 *         name: available
 *         schema:
 *           type: boolean
 *         description: Filter by availability status (true/false)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [price:asc, price:desc, name:asc, name:desc, createdAt:asc, createdAt:desc]
 *         description: Sort field and direction (default createdAt:desc)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Menu items list retrieved successfully
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
 *         description: MongoDB ObjectId of the menu item
 *     responses:
 *       200:
 *         description: Menu item retrieved successfully
 *       404:
 *         description: Menu item not found
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
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
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
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin role required)
 *       404:
 *         description: Menu item not found
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
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin role required)
 *       404:
 *         description: Menu item not found
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
