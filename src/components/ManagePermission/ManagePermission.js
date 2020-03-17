
import React from 'react';
import { object } from 'prop-types';
import Button from '../../layout/Button';
import Typography from '../../layout/Typography';
import { managePermissionLink } from '../../config.json';
import { getJsonItem } from '../../utils/session-storage';

const ManagePermission = ({
  dictionary,
}) => {
  const redirectToCustomerPreference = () => {
    window.location.assign(`${getJsonItem('environment').domain}${managePermissionLink}`);
  };

  return (
    <section className="component-container">

      <Typography component="h4" className="pi-color-greyscale-darkest">
        {dictionary['managepermission.title']}
      </Typography>

      <Typography mb="2">
        {dictionary['managepermission.description']}
      </Typography>

      <Button
        data-test="manage-permission"
        color="secondary"
        fullWidth
        onClick={redirectToCustomerPreference}
      >
        {dictionary['managepermission.button']}
      </Button>

    </section>
  );
};

ManagePermission.propTypes = {
  dictionary: object.isRequired,
};

export default ManagePermission;
