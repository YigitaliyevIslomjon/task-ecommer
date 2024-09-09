import React from 'react';

import context from './context';
import * as Types from './types';

const useContext = (): Types.IContext.Value => {
  const BlockUIContext = React.useContext(context);
  if (!BlockUIContext) {
    throw new Error('useContext must be used within a block-ui Provider');
  }
  return BlockUIContext;
};

export default useContext;
