import { get } from 'radash';

import type * as Types from './types';

export const Post = (item?: any): Types.IEntity.Post => ({
  id: get(item, 'id') || '',
  title: get(item, 'title') || '',
  body: get(item, 'body') || '',
  tags: get(item, 'tags') || [],
  reactions: {
    likes: get(item, 'reactions.likes') || 0,
    dislikes: get(item, 'reactions.dislikes') || 0
  },
  views: get(item, 'views') || 0,
  userId: get(item, 'userId') || 0
});

export const Meta = (item?: any): Types.IEntity.Meta => ({
  total: get(item, 'total') || 0,
  skip: get(item, 'skip') || 1,
  limit: get(item, 'limit')
});
