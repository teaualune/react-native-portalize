import * as React from 'react';

import { Consumer } from './Consumer';
import { Context } from './Host';
import { IPortalNode } from './Manager';

export const Portal = (props: IPortalNode): JSX.Element => (
  <Context.Consumer>
    {(manager): JSX.Element => <Consumer manager={manager} node={props} />}
  </Context.Consumer>
);
