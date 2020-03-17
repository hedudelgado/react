import React from 'react';
import { shallow } from 'enzyme';

import ComponentToggler from '../ComponentToggler';

describe('ComponentToggler Component', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      app: {},
      viewName: 'test',
      edit: () => (<p id="edit">edit</p>),
      view: () => (<p id="view">view</p>),
    };
    wrapper = shallow(<ComponentToggler
      {...props}
    />);
  });

  describe('Renders ComponentToggler Element', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Toggling', () => {
    it('should show only the view mode when viewName does not match current view in app state', () => {
      expect(wrapper).toContainExactlyOneMatchingElement('view');
      expect(wrapper).not.toContainExactlyOneMatchingElement('edit');
    });

    it('should show only the edit mode when viewName matches current view in app state', () => {
      props.app.editViewName = 'test';
      wrapper = shallow(<ComponentToggler {...props} />);
      expect(wrapper).toContainExactlyOneMatchingElement('edit');
      expect(wrapper).not.toContainExactlyOneMatchingElement('view');
    });
  });
});
