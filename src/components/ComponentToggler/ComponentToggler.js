import React from 'react';
import { object, string, func } from 'prop-types';

const ComponentToggler = ({
  app,
  viewName,
  view: View,
  edit: Edit,
  ...props
}) => ((app.editViewName === viewName) ? (
  <Edit {...props} app={app} />
) : (
  <View {...props} app={app} />
));

ComponentToggler.propTypes = {
  app: object.isRequired,
  viewName: string.isRequired,
  view: func.isRequired,
  edit: func.isRequired,
};

export default ComponentToggler;
