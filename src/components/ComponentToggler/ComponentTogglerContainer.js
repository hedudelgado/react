import { connect } from 'react-redux';
import ComponentToggler from './ComponentToggler';
import {
  PROFILE_UPDATED,
  SET_EDIT_VIEW,
  SET_NOTIFICATION_MESSAGE,
  updateUserProfile as updateProfile,
} from '../App/appActions';

const mapStateToProps = ({
  app,
  countries,
  userProfile: { profile },
  dictionary,
  application,
}) => ({
  app,
  countries,
  profile,
  dictionary,
  application,
});

const mapDispatchToProps = dispatch => ({
  setEditView: viewName => dispatch({
    type: SET_EDIT_VIEW,
    editViewName: viewName,
  }),
  setNotificationMessage: messageName => dispatch({
    type: SET_NOTIFICATION_MESSAGE,
    notificationMessage: messageName,
  }),
  updateProfileStore: profile => dispatch({
    type: PROFILE_UPDATED,
    profile,
  }),
  updateProfile: params => dispatch(updateProfile(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComponentToggler);
