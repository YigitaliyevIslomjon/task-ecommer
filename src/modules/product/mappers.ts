import { get } from 'radash';

import type * as Types from './types';

export const Product = (item?: any): Types.IEntity.Product => ({
  id: get(item, 'id', ''),
  title: get(item, 'title', ''),
  description: get(item, 'description', ''),
  category: get(item, 'category', ''),
  price: get(item, 'price', 0),
  discountPercentage: get(item, 'discountPercentage', 0),
  rating: get(item, 'rating', 0),
  stock: get(item, 'stock', 0),
  tags: get(item, 'tags', []), // Default to empty array if tags are undefined
  brand: get(item, 'brand', ''),
  sku: get(item, 'sku', ''),
  weight: get(item, 'weight', 0)
});

export const Meta = (item?: any): Types.IEntity.Meta => ({
  total: get(item, 'total') || 0,
  skip: get(item, 'skip') || 1,
  limit: get(item, 'limit')
});
