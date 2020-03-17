import React from 'react';
import { object, func } from 'prop-types';
import { HeaderInterface } from 'mega-code';
import Typography from '../../layout/Typography';
import Button from '../../layout/Button';
import DeleteModal from '../../layout/DeleteModal';
import BaseStyle from '../../layout/BaseStyle';

const DeleteCustomer = ({
  dictionary,
  openModal,
  closeModal,
  profile,
  deleteCustomer,
}) => {
  const deleteUser = async () => {
    await deleteCustomer(profile);
    closeModal();
    HeaderInterface.userLogOut(HeaderInterface.LOG_OUT_REASONS.DELETE_PROFILE);
  };

  return (
    <BaseStyle component="div" className="component-container">
      <Typography component="h4" className="pi-color-greyscale-darkest">{dictionary['deletecustomer.title']}</Typography>
      <Typography component="p" mb="3">{dictionary['deletecustomer.description']}</Typography>
      <Button
        data-test="delete-customer"
        color="secondary"
        fullWidth
        onClick={() => openModal(
          <DeleteModal
            title={dictionary['deletecustomer.modal.title']}
            subtext={dictionary['deletecustomer.modal.description']}
            deleteFunc={deleteUser}
            buttonLabel={dictionary['deletecustomer.modal.button']}
            handleClose={closeModal}
            cancelLabel={dictionary['deletecustomer.modal.cancel']}
          />,
        )}
      >
        {dictionary['deletecustomer.button']}
      </Button>
    </BaseStyle>
  );
};

DeleteCustomer.propTypes = {
  dictionary: object.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  profile: object.isRequired,
  deleteCustomer: func.isRequired,
};

export default DeleteCustomer;
