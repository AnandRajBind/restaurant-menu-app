export const ROLES = {
  ADMIN: 'Admin',
  USER: 'User',
};

export const MENU_CATEGORIES = [
  'All',
  'Appetizers',
  'Mains',
  'Desserts',
  'Beverages',
  'Salads',
  'Specials',
];

export const SORT_OPTIONS = [
  { label: 'Newest First', value: 'createdAt:desc' },
  { label: 'Oldest First', value: 'createdAt:asc' },
  { label: 'Price: Low to High', value: 'price:asc' },
  { label: 'Price: High to Low', value: 'price:desc' },
  { label: 'Name: A to Z', value: 'name:asc' },
];

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user',
  THEME: 'app_theme',
};
