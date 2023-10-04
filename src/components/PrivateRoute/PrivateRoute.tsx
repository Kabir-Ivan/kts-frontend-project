import { observer } from 'mobx-react-lite';
import React from 'react';

export type PrivateRouteProps = {
  condition: boolean;
  onTrue: React.ReactNode;
  onFalse: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ condition, onTrue, onFalse }) => {
  return condition ? onTrue : onFalse;
};

export default observer(PrivateRoute);
