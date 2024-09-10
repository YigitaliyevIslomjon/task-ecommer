import { get } from 'radash';

import type * as Types from './types';

export const TODO = (item?: any): Types.IEntity.Todo => ({
  id: get(item, 'id', ''),
  todo: get(item, 'todo', ''),
  completed: get(item, 'completed', false),
  userId: get(item, 'userId', 0)
});

export const Meta = (item?: any): Types.IEntity.Meta => ({
  total: get(item, 'total') || 0,
  skip: get(item, 'skip') || 1,
  limit: get(item, 'limit')
});
