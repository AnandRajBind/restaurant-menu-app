import { body, param, query } from 'express-validator';

/**
 * Validation schema for creating a new menu item
 */
export const createMenuValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Menu item name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 5, max: 1000 })
    .withMessage('Description must be between 5 and 1000 characters'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters'),

  body('available')
    .optional()
    .isBoolean()
    .withMessage('Available must be a boolean value (true or false)'),
];

/**
 * Validation schema for updating an existing menu item
 */
export const updateMenuValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid Menu Item ID format'),

  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 5, max: 1000 })
    .withMessage('Description must be between 5 and 1000 characters'),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('category')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters'),

  body('available')
    .optional()
    .isBoolean()
    .withMessage('Available must be a boolean value (true or false)'),
];

/**
 * Validation schema for MongoDB ObjectId route parameter
 */
export const mongoIdParamValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid Menu Item ID format'),
];

/**
 * Validation schema for query parameters in list endpoint
 */
export const queryMenuValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer starting at 1'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be an integer between 1 and 100'),

  query('available')
    .optional()
    .isBoolean()
    .withMessage('Available filter must be a boolean (true or false)'),
];
