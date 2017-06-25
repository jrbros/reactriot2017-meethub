import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../src/theme';
import EmptyState from '../../src/components/EmptyState/EmptyState';

storiesOf('EmptyState', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>
      {getStory()}
    </ThemeProvider>
  ))
  .add('default', () => (
    <EmptyState />
  ));
