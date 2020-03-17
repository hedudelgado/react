import reducer from '../appReducer';

import {
  DEFAULT_VIEW,
  SET_EDIT_VIEW,
  SET_NOTIFICATION_MESSAGE,
} from '../appActions';

describe('App Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      editViewName: undefined,
    });
  });

  it('should update the toggled component name when SET_EDIT_VIEW', () => {
    const action = {
      type: SET_EDIT_VIEW,
      editViewName: 'component',
    };
    expect(reducer(undefined, action)).toEqual({
      editViewName: 'component',
    });
  });

  it('should remove the toggled component view when SET_EDIT_VIEW', () => {
    const action = {
      type: SET_EDIT_VIEW,
      editViewName: DEFAULT_VIEW,
    };
    expect(reducer({ editViewName: 'component' }, action)).toEqual({
      editViewName: DEFAULT_VIEW,
    });
  });

  it('should set show success message when SET_NOTIFICATION_MESSAGE', () => {
    const action = {
      type: SET_NOTIFICATION_MESSAGE,
      notificationMessage: 'success',
    };
    expect(reducer(undefined, action)).toEqual({
      notificationMessage: 'success',
    });
  });
});
