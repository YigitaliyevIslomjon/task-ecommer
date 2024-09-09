import React, { useMemo, useState } from 'react';

import Context from './context.ts';

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isUIBlocked, setUIBlocked] = useState<boolean>(false);

  const contextValue = useMemo(
    () => ({
      isUIBlocked,
      setUIBlocked
    }),
    [isUIBlocked]
  );
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default Provider;
