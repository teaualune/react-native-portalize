import * as React from 'react';

import { Consumer } from './Consumer';
import { Context } from './Host';
import { IPortalNode } from './Manager';

export const Portal = (props: IPortalNode): JSX.Element => (
  <Context.Consumer>
    {(manager): JSX.Element => (
      <Consumer manager={manager} order={props.order}>
        {props.children}
      </Consumer>
    )}
  </Context.Consumer>
);
