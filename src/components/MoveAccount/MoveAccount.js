import React from 'react';
import { object } from 'prop-types';
import Typography from '../../layout/Typography';
import Hyperlink from '../../layout/Hyperlink';
import { getJsonItem } from '../../utils/session-storage';

const MoveAccount = ({ dictionary }) => (
  <section className="component-container">
    <Typography component="h4" className="pi-color-greyscale-darkest">
      {dictionary['moveaccount.title']}
    </Typography>
    <Typography component="p" mb="3" dangerouslySetInnerHTML={{ __html: dictionary['moveaccount.body'] }} />
    <Hyperlink variant="primary" href={getJsonItem('environment').tetheringUrl}>
      {dictionary['moveaccount.submit']}
    </Hyperlink>
  </section>
);

MoveAccount.propTypes = {
  dictionary: object.isRequired,
};

export default MoveAccount;
