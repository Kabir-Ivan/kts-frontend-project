import React from 'react';
import { ILocalStore } from 'store/types';

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const container = React.useRef<null | T>(null);
  if (container.current === null) {
    container.current = creator();
  }

  React.useEffect(() => {
    return () => {
      container.current?.destroy();
    };
  }, []);

  return container.current;
};
