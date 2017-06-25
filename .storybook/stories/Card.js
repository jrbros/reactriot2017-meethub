import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../src/theme';
import Card from '../../src/components/Card';

const user = {
    avatar_url: 'https://avatars3.githubusercontent.com/u/11961940?v=3',
    name: 'Guillaume Mousnier',
    login: '',
    html_url: 'https://github.com/Gmousse',
    location: 'Bordeaux',
    languages: ['JavaScript', 'Shell', 'HTML', 'Python']
}

storiesOf('Card', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>
      {getStory()}
    </ThemeProvider>
  ))
  .add('default', () => (
    <Card {...user} />
  ));
