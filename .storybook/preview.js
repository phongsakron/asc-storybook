import React from 'react';
import { configure, addDecorator } from '@storybook/react';

import * as decorators from './decorators';

export const globalTypes = Object.values(decorators)
  .map(({ global }) => global)
  .reduce((obj, item) => ({ ...obj, ...item }), {});

Object.values(decorators)
  .map(({ decorator }) => decorator)
  .forEach(decorator => addDecorator(decorator));

const customViewports = {
  p1280px: {
    name: '1280px',
    styles: {
      width: '1280px',
      height: '963px',
    },
  },
  p1024px: {
    name: '1024px',
    styles: {
      width: '1024px',
      height: '963px',
    },
  },
  p768px: {
    name: '768px',
    styles: {
      width: '768px',
      height: '963px',
    },
  },
  p375px: {
    name: '375px',
    styles: {
      width: '375px',
      height: '963px',
    },
  },
};

export const parameters = {
  options: {
    storySort: {
      order: [
        'Ui Only',
        ['Social', 'Chat'],
        'SDK Connected',
        ['Social', 'Chat'],
        'Utilities',
        'Assets',
      ],
    },
  },
  viewport: { viewports: customViewports }
};
