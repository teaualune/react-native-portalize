# Portalize

[![npm version](https://badge.fury.io/js/react-native-portalize.svg)](https://badge.fury.io/js/react-native-portalize)

The simplest way to render anything on top of the rest.

Forked from [jeremybarbet/react-native-portalize](https://github.com/jeremybarbet/react-native-portalize)

## Installation

```bash
yarn add react-native-portalize
```

## Usage

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { PortalizeHost, PortalizePortal } from 'react-native-portalize';

export const MyApp = () => (
  <PortalizeHost>
    <View>
      <Text>Some copy here and there...</Text>
      <PortalizePortal>
        <Text>A portal on top of the rest</Text>
      </PortalizePortal>
    </View>
  </PortalizeHost>
);
```

## Advanced Usage: Separated Host and Portal

```tsx
import {createPortal} from '../react-native-portalize';

const SecondPortal = createPortal('Second');

export const MyApp = () => (
  <SecondPortal.Host>
    <View>
      <Text>Some copy here and there...</Text>
      <SecondPortal.Portal>
        <Text>A portal on top of the rest</Text>
      </SecondPortal.Portal>
    </View>
  </SecondPortal.Host>
);
```

## Props

### PortalizeHost

- `children`

A React node that will be most likely wrapping your whole app.

| Type | Required |
| ---- | -------- |
| node | Yes      |

### PortalizePortal

- `children`

The React node you want to display on top of the rest.

| Type | Required |
| ---- | -------- |
| node | Yes      |

- `order`

Stacking order of the node. Default is `0`.

| Type   | Required |
| ------ | -------- |
| number | No       |

### createPortal

Create a separated `Host` and `Portal`.

- `hostID`

Only used for debug purpose.

| Type   | Required |
| ------ | -------- |
| string | Yes      |