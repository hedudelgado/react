import React from 'react';
import { shallow } from 'enzyme';
import NotificationDefault from '../Notification';
import Notification from '../index';

jest.mock('../Notification', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Notification interface', () => {
  it('Should export the notification component', () => {
    shallow(<Notification />);
    expect(NotificationDefault).toHaveBeenCalled();
  });
});
