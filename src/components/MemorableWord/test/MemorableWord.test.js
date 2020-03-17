import React from 'react';
import { shallow } from 'enzyme';
import MemorableWord from '../MemorableWord';
import { resetMemorableWord, tetherLogin } from '../../../utils/api';
import { MEMORABLE_WORD_ERROR, MEMORABLE_WORD_VIEW } from '../../App/appActions';

jest.mock('../../../utils/api', () => ({
  __esModule: true,
  resetMemorableWord: jest.fn(() => Promise.resolve({})),
  tetherLogin: jest.fn(() => Promise.resolve({})),
}));

describe('MemorableWord Component', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      dictionary: {
        'memorable.word.title': 'Reset your memorable word',
        'memorable.word.body': 'Your memorable word is different from your password and can be used to authorise \'Card not present\' payments.',
        'memorable.word.placeholder': 'New memorable word',
        'memorable.word.error': 'This should be a minimum of 8 characters containing at least one number and capital letter and no special characters',
        'memorable.word.submit': 'Submit',
      },
      profile: {
        business: {
          tetheredGuid: 'guid',
        },
      },
      app: {},
      setNotificationMessage: jest.fn(),
    };
    wrapper = shallow(<MemorableWord {...props} />);
  });

  it('should render the component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should not set touched when user is typing for the first time', () => {
    expect(wrapper.find('[name="memorableWord"]')).toHaveProp('touched', false);
    wrapper.find('[name="memorableWord"]').simulate('change', { target: { value: '' } });
    expect(wrapper.find('[name="memorableWord"]'))
      .toHaveProp('touched', false)
      .toHaveProp('error', props.dictionary['memorable.word.error']);
  });

  it('should set field to touched after blur event', () => {
    expect(wrapper.find('[name="memorableWord"]')).toHaveProp('touched', false);
    wrapper.find('[name="memorableWord"]').simulate('blur', { target: { value: '' } });
    expect(wrapper.find('[name="memorableWord"]'))
      .toHaveProp('touched', true)
      .toHaveProp('error', props.dictionary['memorable.word.error']);
  });

  it('should show success notification', () => {
    props.app.notificationMessage = MEMORABLE_WORD_VIEW;
    wrapper = shallow(<MemorableWord {...props} />);
    expect(wrapper).toContainExactlyOneMatchingElement('[data-test="success-message"]');
  });

  it('should show error notification', () => {
    props.app.notificationMessage = MEMORABLE_WORD_ERROR;
    wrapper = shallow(<MemorableWord {...props} />);
    expect(wrapper).toContainExactlyOneMatchingElement('[data-test="error-notification"]');
  });

  it('should submit form with update success procedure', async () => {
    wrapper.find('[name="memorable-word-form"]').simulate('submit', { preventDefault: () => {} });

    await Promise.all([resetMemorableWord, tetherLogin]).then(() => {
      expect(props.setNotificationMessage)
        .toHaveBeenCalledTimes(1)
        .toHaveBeenCalledWith(MEMORABLE_WORD_VIEW);
    });
  });

  it('should set notification error when tetherLogin fails', async () => {
    tetherLogin.mockImplementationOnce(jest.fn(() => Promise.reject({})));
    wrapper.find('[name="memorable-word-form"]').simulate('submit', { preventDefault: () => {} });

    await Promise.all([tetherLogin]).then(() => {
      expect(props.setNotificationMessage)
        .toHaveBeenCalledTimes(1)
        .toHaveBeenCalledWith(MEMORABLE_WORD_ERROR);
    });
  });
});
