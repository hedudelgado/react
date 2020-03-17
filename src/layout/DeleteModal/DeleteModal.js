import React, { Fragment } from 'react';
import { string, func } from 'prop-types';
import Typography from '../Typography';
import Button from '../Button';

const DeleteModal = ({
  title,
  subtext,
  deleteFunc,
  buttonLabel,
  handleClose,
}) => (
  <Fragment>
    <Typography component="h5" mt="1">{title}</Typography>
    <Typography component="p" size="s">{subtext}</Typography>
    <Button data-test="delete-button" type="button" color="primary" className="mt2 mb2" onClick={deleteFunc} fullWidth>{buttonLabel}</Button>
    <Button data-test="cancel-button" type="button" color="default" variant="text" className="underline" onClick={handleClose}>Cancel changes</Button>
  </Fragment>
);

DeleteModal.propTypes = {
  title: string.isRequired,
  subtext: string.isRequired,
  deleteFunc: func.isRequired,
  handleClose: func.isRequired,
  buttonLabel: string.isRequired,
};

export default DeleteModal;
