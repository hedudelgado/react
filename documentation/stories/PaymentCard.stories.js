import React from 'react';

import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';

import withRedux from './utils/withRedux';
import mockApis from './utils/mockApis';

import applicationMock from '../../mockedConfig/application.json';
import dictionaryMock from '../../mockedDictionary/en.json';

import { PaymentCardContainer as PaymentCard } from '../../src/components/PaymentCard';

const app = {};

storiesOf('Payment Card', module)
  .addDecorator(withKnobs)
  .addDecorator(withRedux())
  .addDecorator(mockApis)
  .add('With Card', () => {
    const profile = {
      paymentPreference: {
        paymentCard: {
          cardType: 'VI',
          cardNumber: '************1111',
          expiryDate: '07/23',
          cardHolderName: 'dwa',
        },
      },
    };

    return (
      <PaymentCard
        app={app}
        dictionary={dictionaryMock}
        application={applicationMock}
        profile={profile}
        setEditView={() => {}}
        setSuccessMessage={() => {}}
        updateProfileStore={() => {}}
        setNotificationMessage={() => {}}
      />
    );
  })
  .add('Without Card', () => {
    const profile = {
      paymentPreference: {},
    };
    return (
      <PaymentCard
        app={app}
        dictionary={dictionaryMock}
        application={applicationMock}
        profile={profile}
        setEditView={() => {}}
        setSuccessMessage={() => {}}
        updateProfileStore={() => {}}
        setNotificationMessage={() => {}}
      />
    );
  });
