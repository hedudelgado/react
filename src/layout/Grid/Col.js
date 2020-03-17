import React from 'react';
import {
  node, bool, string, oneOf,
} from 'prop-types';
import classNames from 'classnames';

import BaseStyle from '../BaseStyle';

const SIZES = ['auto', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const Col = ({
  children,
  border,
  sm,
  md,
  lg,
  size,
  className: classNameProps,
  ...otherProps
}) => {
  const baseSizeClass = () => (sm && 'sm-') || (md && 'md-') || (lg && 'lg-') || '';
  const classes = classNames(
    classNameProps,
    [`${baseSizeClass()}col`],
    {
      border,
      col: size,
      [`sm-col-${sm}`]: sm,
      [`md-col-${md}`]: md,
      [`lg-col-${lg}`]: lg,
      [`col-${size}`]: size,
    },
  );
  return <BaseStyle className={classes} {...otherProps}>{children}</BaseStyle>;
};

Col.propTypes = {
  /**
   * Any Node
   */
  children: node.isRequired,
  /**
   * optional: displays column borders
   */
  border: bool,
  /**
   * Size for a static column
   * Use for non-responsive Grid only
   */
  size: oneOf(SIZES),
  /**
   * tablet breakpoint
   */
  sm: oneOf(SIZES),
  /**
   * tabletLarge breakpoint
   */
  md: oneOf(SIZES),
  /**
   * desktop breakpoint
   */
  lg: oneOf(SIZES),
  /**
   * additional css classes
   */
  className: string,
};

Col.defaultProps = {
  border: false,
};

export default Col;
