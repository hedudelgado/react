import React from 'react';
import { storiesOf } from '@storybook/react';
import withRedux from './utils/withRedux';
import mockApis from './utils/mockApis';
import { setItem } from '../../src/utils/session-storage';

import profile from '../../__mocks__/profile.json';
import { AppContainer as App } from '../../src/components/App';

storiesOf('Account Settings', module)
  .addDecorator(withRedux())
  .addDecorator(mockApis)
  .add('Preview', () => {
    setItem('email', 'rachelle.ragasa@gmail.com');
    setItem('profile', profile);

    return <App />;
  });
