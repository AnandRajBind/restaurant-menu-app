import { menuService } from '../services/menu.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

class MenuController {
  /**
   * Create a new menu item
   * POST /api/v1/menu
   */
  createMenu = asyncHandler(async (req, res) => {
    let imagePath;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const menuItem = await menuService.createMenuItem(
      req.body,
      req.user._id,
      imagePath
    );

    return res.status(HTTP_STATUS.CREATED).json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        menuItem,
        'Menu item created successfully'
      )
    );
  });

  /**
   * Get all menu items with search, filters, sorting & pagination
   * GET /api/v1/menu
   */
  getAllMenu = asyncHandler(async (req, res) => {
    const result = await menuService.getAllMenuItems(req.query);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        result,
        'Menu items retrieved successfully'
      )
    );
  });

  /**
   * Get a single menu item by ID
   * GET /api/v1/menu/:id
   */
  getMenuById = asyncHandler(async (req, res) => {
    const menuItem = await menuService.getMenuItemById(req.params.id);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        menuItem,
        'Menu item retrieved successfully'
      )
    );
  });

  /**
   * Update an existing menu item
   * PUT /api/v1/menu/:id
   */
  updateMenu = asyncHandler(async (req, res) => {
    let imagePath;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const updatedItem = await menuService.updateMenuItem(
      req.params.id,
      req.body,
      imagePath
    );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        updatedItem,
        'Menu item updated successfully'
      )
    );
  });

  /**
   * Delete a menu item
   * DELETE /api/v1/menu/:id
   */
  deleteMenu = asyncHandler(async (req, res) => {
    const deletedItem = await menuService.deleteMenuItem(req.params.id);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        { id: deletedItem._id },
        'Menu item deleted successfully'
      )
    );
  });
}

export const menuController = new MenuController();
