import React, { Component } from 'react';
import {
  array,
  object,
  func,
  bool,
  node,
} from 'prop-types';
import {
  PASSWORD_VIEW,
  PAYMENT_CARD_VIEW,
  USER_DETAILS_VIEW,
  ROOM_REQUIREMENTS_VIEW,
  EXTRAS_PREFERENCES_VIEW,
} from './appActions';
import { ComponentTogglerContainer } from '../ComponentToggler';
import UserProfile from '../UserProfile';
import Password from '../Password';
import UserProfileFormContainer from '../UserProfileForm';
import PasswordFormContainer from '../PasswordForm';
import { PaymentCardContainer } from '../PaymentCard';
import { RegularGuestsContainer } from '../RegularGuests';
import { NewsletterContainer } from '../Newsletter';
import Modal from '../../layout/Modal';
import PaymentCardFormContainer from '../PaymentCardForm';
import { DeleteCustomerContainer } from '../DeleteCustomer';
import RoomRequirements from '../RoomRequirements';
import RoomRequirementsFormContainer from '../RoomRequirementsForm';
import ExtrasPreferences from '../ExtrasPreferences';
import ExtrasPreferencesFormContainer from '../ExtrasPreferencesForm';
import BaseStyle from '../../layout/BaseStyle';
import MemorableWord from '../MemorableWord';
import MoveAccount from '../MoveAccount';
import {
  STAYER, SELF, managePermissionFlag, USER_LOGGED_IN_EVENT,
} from '../../config.json';
import ManagePermission from '../ManagePermission';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoggedIn = this.handleLoggedIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('message', this.handleLoggedIn);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleLoggedIn);
  }

  async handleLoggedIn(event) {
    if (event.data.action === USER_LOGGED_IN_EVENT) {
      const { getSettings } = this.props;
      const { contactDetail: { email }, sessionId, business } = JSON.parse(event.data.profile);
      getSettings(email, sessionId, !!business);
    }
  }

  render() {
    const {
      countries,
      dictionary,
      profile,
      regions,
      newsletter,
      displayModal,
      handleModalClose,
      modalContent,
      userDataReceived,
      application: {
        showEmailPreferences,
      },
    } = this.props;

    const {
      business,
      business: {
        accessLevel = '',
        tetheredGuid = '',
      } = {},
    } = profile;

    const appReady = userDataReceived
      && (!showEmailPreferences || !!regions.length)
      && !!countries.length
      && (!showEmailPreferences || !!Object.keys(newsletter).length)
      && !!Object.keys(dictionary).length
      && !!Object.keys(profile).length;

    const showExtrasPreferences = !(accessLevel === SELF || accessLevel === STAYER);

    return (
      <div data-test="AccountSettings">
        {appReady
        && (
          <BaseStyle className="wb-typography app-container">
            <ComponentTogglerContainer
              viewName={USER_DETAILS_VIEW}
              view={UserProfile}
              edit={UserProfileFormContainer}
            />
            <ComponentTogglerContainer
              viewName={PASSWORD_VIEW}
              view={Password}
              edit={PasswordFormContainer}
            />
            <ComponentTogglerContainer
              viewName={PAYMENT_CARD_VIEW}
              view={PaymentCardContainer}
              edit={PaymentCardFormContainer}
            />
            {managePermissionFlag && (
              <ManagePermission dictionary={dictionary} />
            )}
            <RegularGuestsContainer />
            {showEmailPreferences && (
              <NewsletterContainer />
            )}
            <ComponentTogglerContainer
              viewName={ROOM_REQUIREMENTS_VIEW}
              view={RoomRequirements}
              edit={RoomRequirementsFormContainer}
            />
            {showExtrasPreferences && (
              <ComponentTogglerContainer
                viewName={EXTRAS_PREFERENCES_VIEW}
                view={ExtrasPreferences}
                edit={ExtrasPreferencesFormContainer}
              />
            )}
            {!!tetheredGuid && (
              <MemorableWord />
            )}
            {business && !tetheredGuid && (
              <MoveAccount />
            )}
            {!business && (
            <DeleteCustomerContainer />
            )}
            {displayModal && <Modal data-test="Modal" display content={modalContent} handleClose={handleModalClose} />}
          </BaseStyle>
        )
      }
      </div>
    );
  }
}

App.propTypes = {
  countries: array.isRequired,
  dictionary: object.isRequired,
  profile: object.isRequired,
  getSettings: func.isRequired,
  displayModal: bool.isRequired,
  handleModalClose: func.isRequired,
  modalContent: node,
  newsletter: object.isRequired,
  regions: array.isRequired,
  userDataReceived: bool.isRequired,
  application: object.isRequired,
};

export default App;
