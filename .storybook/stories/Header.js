import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../src/theme';
import Header from '../../src/components/Header';

storiesOf('Header', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>
      {getStory()}
    </ThemeProvider>
  ))
  .add('default', () => (
    <Header />
  ));
