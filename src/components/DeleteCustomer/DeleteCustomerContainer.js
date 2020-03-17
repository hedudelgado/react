import { connect } from 'react-redux';
import DeleteCustomer from './DeleteCustomer';
import { openModal, closeModal } from '../App/modalActions';
import {
  deleteUserProfile as deleteCustomer,
} from '../App/appActions';

const mapStateToProps = ({
  dictionary,
  application,
  userProfile: { profile },
}) => ({
  dictionary,
  application,
  profile,
});

const mapDispatchToProps = dispatch => ({
  openModal: content => dispatch(openModal(content)),
  closeModal: () => dispatch(closeModal()),
  deleteCustomer: profile => dispatch(deleteCustomer(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCustomer);
