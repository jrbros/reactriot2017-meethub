import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../src/theme';
import Filters from '../../src/components/Filters';

const geoLocation = {
    empty: '',
    placeId: ''
}

const languages = {
    selectedLanguages: []
}

storiesOf('Filters', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>
      {getStory()}
    </ThemeProvider>
  ))
  .add('default', () => (
    <Filters geoLocation={geoLocation} languages={languages} />
  ));
