import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../src/theme';
import Spinner from '../../src/components/Loader/Spinner';

storiesOf('Spinner', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>
      {getStory()}
    </ThemeProvider>
  ))
  .add('default', () => (
    <Spinner />
  ));
