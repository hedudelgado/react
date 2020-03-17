import { connect } from 'react-redux';
import MemorableWord from './MemorableWord';
import { SET_NOTIFICATION_MESSAGE } from '../App/appActions';

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
  setNotificationMessage: messageName => dispatch({
    type: SET_NOTIFICATION_MESSAGE,
    notificationMessage: messageName,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MemorableWord);
