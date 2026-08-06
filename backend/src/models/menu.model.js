import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Menu item name is required'],
      trim: true,
      minlength: [2, 'Menu item name must be at least 2 characters'],
      maxlength: [100, 'Menu item name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Menu item description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true,
    },
    image: {
      type: String,
      default: '/uploads/default-food.png',
    },
    available: {
      type: Boolean,
      default: true,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator user ID is required'],
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Compound Index for optimized category, availability, and price filter queries
menuSchema.index({ category: 1, available: 1, price: 1 });

// Text Index for full-text search capability on name and description
menuSchema.index(
  { name: 'text', description: 'text' },
  { weights: { name: 10, description: 5 }, name: 'MenuTextIndex' }
);

export const Menu = mongoose.model('Menu', menuSchema);
