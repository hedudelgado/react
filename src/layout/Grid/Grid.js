import React from 'react';
import { node, bool } from 'prop-types';
import classNames from 'classnames';

import BaseStyle from '../BaseStyle';

const Grid = ({
  children,
  border,
  ...otherProps
}) => {
  const classes = classNames(
    'clearfix',
    {
      border,
    },
  );
  return <BaseStyle className={classes} {...otherProps}>{children}</BaseStyle>;
};

Grid.propTypes = {
  /**
   * Any Node
   */
  children: node.isRequired,
  /**
   * optional: displays column borders
   */
  border: bool,
};

export default Grid;
