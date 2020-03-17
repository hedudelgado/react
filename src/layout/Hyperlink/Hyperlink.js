import React from 'react';
import {
  node,
  oneOf,
  string,
} from 'prop-types';
import classNames from 'classnames';

const Hyperlink = ({
  variant,
  href,
  children,
  className,
  ...otherProps
}) => {
  const classes = classNames(
    {
      'wb-btn wb-btn--full-width wb-btn--small max-fit': (variant === 'primary' || variant === 'secondary'),
      'wb-btn--primary': variant === 'primary',
      'wb-btn--secondary': variant === 'secondary',
    },
    className,
  );

  return (
    <a href={`${href}`} className={classes} {...otherProps}>
      {children}
    </a>
  );
};

Hyperlink.propTypes = {
  /**
   * Variant defines the Hyperlink's visual represenation.
   */
  variant: oneOf(['regular', 'primary', 'secondary']),
  /**
   * The anchor tag's target URL.
   */
  href: string,
  /**
   * The Hyperlink contents. It is usually a text, but it can also be further DOM.
   */
  children: node,
  /**
   * Extra CSS classes the component might need.
   */
  className: string,
};

Hyperlink.defaultProps = {
  variant: 'regular',
  href: '#',
  children: null,
  className: '',
};

export default Hyperlink;
