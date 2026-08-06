import fs from 'fs';
import path from 'path';
import { Menu } from '../models/menu.model.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

class MenuService {
  /**
   * Creates a new restaurant menu item.
   * @param {object} menuData - Form fields { name, description, price, category, available }
   * @param {string} userId - ID of authenticated admin user
   * @param {string} [imagePath] - Uploaded image path relative to server root
   * @returns {Promise<object>}
   */
  async createMenuItem(menuData, userId, imagePath) {
    const payload = {
      ...menuData,
      createdBy: userId,
    };

    if (imagePath) {
      payload.image = imagePath;
    }

    const menuItem = await Menu.create(payload);
    return await menuItem.populate('createdBy', 'name email');
  }

  /**
   * Fetches paginated menu items with search, filtering, and price/date sorting.
   * @param {object} queryParams - Query parameters from URL
   * @returns {Promise<{items: Array, pagination: object}>}
   */
  async getAllMenuItems(queryParams) {
    const {
      search,
      category,
      available,
      sortBy = 'createdAt:desc',
      page = 1,
      limit = 10,
    } = queryParams;

    const filter = {};

    // 1. Case-insensitive text search on name or description
    if (search && search.trim() !== '') {
      filter.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    // 2. Exact or case-insensitive category filter
    if (category && category.trim() !== '') {
      filter.category = { $regex: `^${category.trim()}$`, $options: 'i' };
    }

    // 3. Availability status filter
    if (available !== undefined && available !== '') {
      filter.available = available === 'true' || available === true;
    }

    // 4. Determine sort options
    let sortOptions = {};
    switch (sortBy) {
      case 'price:asc':
        sortOptions = { price: 1 };
        break;
      case 'price:desc':
        sortOptions = { price: -1 };
        break;
      case 'name:asc':
        sortOptions = { name: 1 };
        break;
      case 'name:desc':
        sortOptions = { name: -1 };
        break;
      case 'createdAt:asc':
        sortOptions = { createdAt: 1 };
        break;
      case 'createdAt:desc':
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    // 5. Calculate pagination skip & limit
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // 6. Execute parallel DB count and query
    const [totalItems, items] = await Promise.all([
      Menu.countDocuments(filter),
      Menu.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .populate('createdBy', 'name email'),
    ]);

    const totalPages = Math.ceil(totalItems / limitNum) || 1;

    return {
      items,
      pagination: {
        totalItems,
        totalPages,
        currentPage: pageNum,
        limit: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    };
  }

  /**
   * Fetches a single menu item by ID.
   * @param {string} id - Menu item ObjectId
   * @returns {Promise<object>}
   */
  async getMenuItemById(id) {
    const menuItem = await Menu.findById(id).populate('createdBy', 'name email');
    if (!menuItem) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        `Menu item with ID '${id}' not found.`
      );
    }
    return menuItem;
  }

  /**
   * Updates an existing menu item.
   * @param {string} id - Menu item ObjectId
   * @param {object} updateData - Updated fields
   * @param {string} [imagePath] - New image upload path
   * @returns {Promise<object>}
   */
  async updateMenuItem(id, updateData, imagePath) {
    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        `Menu item with ID '${id}' not found.`
      );
    }

    // If new image is uploaded, cleanup old uploaded image if local
    if (imagePath) {
      this._cleanupOldImage(menuItem.image);
      menuItem.image = imagePath;
    }

    // Update text fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        menuItem[key] = updateData[key];
      }
    });

    await menuItem.save();
    return await menuItem.populate('createdBy', 'name email');
  }

  /**
   * Deletes a menu item by ID and removes associated image file.
   * @param {string} id - Menu item ObjectId
   * @returns {Promise<object>} Deleted item
   */
  async deleteMenuItem(id) {
    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        `Menu item with ID '${id}' not found.`
      );
    }

    // Clean up uploaded image file from storage
    this._cleanupOldImage(menuItem.image);

    await menuItem.deleteOne();
    return menuItem;
  }

  /**
   * Helper function to safely delete local image files from disk storage.
   * @param {string} imagePath
   */
  _cleanupOldImage(imagePath) {
    if (
      imagePath &&
      imagePath.startsWith('/uploads/') &&
      !imagePath.includes('default-food')
    ) {
      const fullPath = path.join(process.cwd(), imagePath);
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.warn(`[Storage] Failed to delete old image file '${fullPath}': ${err.message}`);
        }
      });
    }
  }
}

export const menuService = new MenuService();
