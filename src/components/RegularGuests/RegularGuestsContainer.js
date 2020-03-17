import { connect } from 'react-redux';
import RegularGuests from './RegularGuests';
import {
  DEFAULT_VIEW,
  SET_EDIT_VIEW,
  SET_NOTIFICATION_MESSAGE,
  REGULAR_GUESTS_VIEW,
} from '../App/appActions';
import { openModal, closeModal } from '../App/modalActions';


const mapStateToProps = ({
  dictionary,
  userProfile: { profile },
  app,
}) => ({
  dictionary,
  profile,
  app,
});

const mapDispatchToProps = dispatch => ({
  setEditView: viewName => dispatch({
    type: SET_EDIT_VIEW,
    editViewName: viewName,
  }),
  toggleEditView: (i = 0) => dispatch({
    type: SET_EDIT_VIEW,
    editViewName: `${REGULAR_GUESTS_VIEW}_${i}`,
  }),
  hideSuccessMessage: () => dispatch({
    type: SET_NOTIFICATION_MESSAGE,
    notificationMessage: DEFAULT_VIEW,
  }),
  openModal: content => dispatch(openModal(content)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegularGuests);
