import { connect } from 'react-redux';
import PaymentCard from './PaymentCard';
import { openModal, closeModal } from '../App/modalActions';
import {
  updateUserProfile as updateProfile,
} from '../App/appActions';

const mapDispatchToProps = dispatch => ({
  openModal: content => dispatch(openModal(content)),
  closeModal: () => dispatch(closeModal()),
  updateProfile: params => dispatch(updateProfile(params)),
});

export default connect(null, mapDispatchToProps)(PaymentCard);
