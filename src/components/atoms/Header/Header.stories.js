import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from './Header';
import theme from '../../../theme/theme';

storiesOf('Header', module)
  .add('Header', () => <Header color={theme.primary}>Header</Header>);
