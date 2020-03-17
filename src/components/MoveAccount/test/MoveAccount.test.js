import React from 'react';
import { shallow } from 'enzyme';
import MoveAccount from '../MoveAccount';

jest.mock('../../../utils/session-storage', () => ({
  __esModule: true,
  getJsonItem: () => ({
    tetheringUrl: 'https://develop--pi-account-tethering.netlify.com',
  }),
}));

describe('MoveAccount Component', () => {
  const props = {
    dictionary: {
      'moveaccount.title': 'Move Account',
      'moveaccount.body': 'A lot of text',
      'moveaccount.submit': 'Move my account',
    },
  };

  const wrapper = shallow(<MoveAccount {...props} />);

  it('should render the component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
