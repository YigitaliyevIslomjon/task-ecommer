import { createContext } from 'react';

import * as Types from './types';

const context = createContext<Types.IContext.Value>({
  isUIBlocked: false,
  setUIBlocked: () => {}
});

export default context;
