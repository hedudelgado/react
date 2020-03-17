import React, { Fragment } from 'react';
import { func, object } from 'prop-types';
import {
  DEFAULT_VIEW,
  PAYMENT_CARD_VIEW,
  PAYMENT_CARD_ERROR,
} from '../App/appActions';
import { getJsonItem } from '../../utils/session-storage';
import Button from '../../layout/Button';
import Typography from '../../layout/Typography';
import BaseStyle from '../../layout/BaseStyle';
import DeleteModal from '../../layout/DeleteModal';
import Notification from '../../layout/Notification';
import { paymentCards } from '../../config.json';

const PaymentCard = ({
  app: { notificationMessage },
  setEditView,
  setNotificationMessage,
  dictionary,
  openModal,
  closeModal,
  profile,
  updateProfileStore,
  updateProfile,
}) => {
  const deleteCard = () => {
    const payload = {
      ...profile,
      paymentPreference: {
        ...profile.paymentPreference,
        paymentCard: {},
      },
    };

    updateProfile(payload)
      .then(() => {
        updateProfileStore(payload);
        closeModal();
        setNotificationMessage(PAYMENT_CARD_VIEW);
      }).catch(() => {
        setNotificationMessage(PAYMENT_CARD_ERROR);
      });
  };

  const showEditMode = () => {
    setEditView(PAYMENT_CARD_VIEW);
    setNotificationMessage(DEFAULT_VIEW);
  };
  const {
    paymentPreference: {
      paymentCard: {
        cardType = '',
        cardNumber = '',
        expiryDate = '',
        cardHolderName = '',
      } = {},
    } = {},
  } = profile;
  const splitExpiryDate = expiryDate.split('/');
  const isCardExpired = new Date(`20${splitExpiryDate[1]}`, splitExpiryDate[0]) < new Date();
  const formattedCardNumber = `•••• •••• •••• ${cardNumber.replace(/\*/g, '')}`;

  return (
    <section className="component-container">
      {notificationMessage === PAYMENT_CARD_ERROR && (
        <Notification data-test="error-notification" priority={2} variant="error" ariaLive="polite" show>
          {dictionary['generic.error']}
        </Notification>
      )}
      {notificationMessage === PAYMENT_CARD_VIEW && (
        <Notification data-test="success-message" priority={2} variant="success" ariaLive="polite" show>
          {dictionary['update.success.message']}
        </Notification>
      )}
      <Typography component="h4" className="pi-color-greyscale-darkest">
        {dictionary['payment.title']}
      </Typography>
      {isCardExpired && (
        <div data-test="error" className="wb-notification wb-notification__unhousedalert">
          <i className="wb-notification-icon wb-icon_disc-info-new" />
          <div className="wb-notification-text">
            {dictionary['payment.expired']}
          </div>
        </div>
      )}
      {!!cardType && (
        <BaseStyle className="basic-spacer" component="div" mb="3">
          <div className="card-layout p2 mt1 border rounded wb-push--bottom">
            <div className="right-align bold pb1">{paymentCards[cardType].name}</div>
            <div className="right-align">{formattedCardNumber}</div>
            <div className="clearfix col-12 card-details relative">
              <div className="col col-10">
                <div className="pi-color-greyscale-dark">
                  {dictionary['payment.expirydate']}
                </div>
                <div className="pb1">{expiryDate}</div>
                <div>{cardHolderName}</div>
              </div>
              <div className="col col-2 right-align">
                <img
                  src={getJsonItem('environment').domain + paymentCards[cardType].img}
                  className="block right absolute bottom-0 right-0"
                  alt={paymentCards[cardType].name}
                />
              </div>
            </div>
          </div>
          <Button
            data-test="deleteCard"
            className="wb-text-btn--underline block wb-push--bottom"
            variant="text"
            color="red"
            onClick={() => openModal(
              <DeleteModal
                title={dictionary['payment.delete.title']}
                subtext={dictionary['payment.delete.text']}
                deleteFunc={deleteCard}
                buttonLabel={dictionary['payment.delete.button']}
                handleClose={closeModal}
              />,
            )}
          >
            {dictionary['payment.button.delete']}
          </Button>
          <Button id="edit-card" color="quaternary" onClick={showEditMode}>
            {dictionary['payment.button.addnew']}
          </Button>
        </BaseStyle>
      )}
      {!cardType && (
        <Fragment>
          <Typography mb="3" data-test="no-guests-message">
            {dictionary['payment.nocard']}
          </Typography>
          <Button id="add-card" color="secondary" fullWidth onClick={showEditMode}>
            {dictionary['payment.button.add']}
          </Button>
        </Fragment>
      )}
    </section>
  );
};

PaymentCard.propTypes = {
  app: object.isRequired,
  profile: object.isRequired,
  dictionary: object.isRequired,
  setEditView: func.isRequired,
  setNotificationMessage: func.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  updateProfileStore: func.isRequired,
  updateProfile: func.isRequired,
};

export default PaymentCard;
