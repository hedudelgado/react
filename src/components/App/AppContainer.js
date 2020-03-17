import { connect } from 'react-redux';
import { getSettings as getSettingsAction } from './appActions';
import { closeModal } from './modalActions';

import App from './App';

const mapStateToProps = ({
  modal: {
    display: displayModal,
    content: modalContent,
  },
  dictionary,
  config,
  countries,
  regions,
  newsletter,
  application,
  userProfile: {
    userDataReceived,
    profile,
  },
}) => ({
  profile,
  displayModal,
  modalContent,
  dictionary,
  config,
  countries,
  regions,
  newsletter,
  application,
  userDataReceived,
});

const mapDispatchToProps = dispatch => ({
  getSettings:
    (email, sessionId, business) => dispatch(getSettingsAction(email, sessionId, business)),
  handleModalClose: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
