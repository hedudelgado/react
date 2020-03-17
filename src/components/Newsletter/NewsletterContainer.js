import { connect } from 'react-redux';
import Newsletter from './Newsletter';
import { SET_NOTIFICATION_MESSAGE, NEWSLETTER_UPDATED } from '../App/appActions';

const mapStateToProps = ({
  app,
  dictionary,
  userProfile: {
    profile: {
      contactDetail: contactDetails,
    },
  },
  regions,
  newsletter,
  application,
}) => ({
  app,
  dictionary,
  contactDetails,
  regions,
  newsletter,
  application,
});

const mapDispatchToProps = dispatch => ({
  setNotificationMessage: messageName => dispatch({
    type: SET_NOTIFICATION_MESSAGE,
    notificationMessage: messageName,
  }),
  updateNewsletterStore: newsletter => dispatch({
    type: NEWSLETTER_UPDATED,
    newsletter,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Newsletter);
