import React from 'react';
import { shallow } from 'enzyme';
import Notification from '../Notification';

describe('Notification component', () => {
  const priorities = [1];
  const variants = ['warning'];

  const combinedProps = [];
  priorities.forEach((priority) => {
    variants.forEach((variant) => {
      combinedProps.push([priority, variant]);
    });
  });

  it('should show the component', () => {
    const props = {
      ariaLive: 'polite',
      variant: 'warning',
      priority: 2,
      show: true,
    };
    const wrapper = shallow(<Notification {...props}>This is a notification</Notification>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render a title if one is present', () => {
    const props = {
      ariaLive: 'polite',
      variant: 'warning',
      priority: 2,
      show: true,
      title: 'Some title',
    };
    const wrapper = shallow(<Notification {...props}>This is a notification</Notification>);

    expect(wrapper).toContainExactlyOneMatchingElement('.title');
  });

  it('should render a sticky notification', () => {
    const props = {
      ariaLive: 'polite',
      variant: 'warning',
      priority: 2,
      show: true,
      sticky: true,
    };
    const wrapper = shallow(<Notification {...props}>This is a notification</Notification>);

    expect(wrapper).toContainExactlyOneMatchingElement('.sticky');
  });

  it('should hide the component', () => {
    const props = {
      ariaLive: 'polite',
      variant: 'warning',
      priority: 2,
      show: false,
      sticky: true,
    };
    const wrapper = shallow(<Notification {...props}>This is a notification</Notification>);

    expect(wrapper).toBeEmptyRender();
  });

  it.each(combinedProps)(
    'should render Notification with priority %i and variant %s',
    (priority, variant) => {
      const wrapper = shallow(<Notification ariaLive="off" priority={priority} variant={variant} show>Text</Notification>);
      expect(wrapper).toHaveClassName(`pi-notification priority-${priority} priority-${priority}-${variant}`);
    },
  );
});
