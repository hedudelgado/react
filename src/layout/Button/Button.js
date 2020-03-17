import React from 'react';
import {
  element, string, oneOfType, func, oneOf, bool,
} from 'prop-types';
import classNames from 'classnames';

const variants = {
  button: 'btn',
  text: 'text-btn',
};

const colors = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  quaternary: 'quaternary',
  red: 'red',
  default: 'default',
};

const Button = ({
  children,
  onClick,
  variant,
  type,
  color,
  href,
  fullWidth,
  disabled,
  className: classNameProp,
}) => {
  /** The size of the button */
  const cssClasses = classNames(
    `wb-${variants[variant]}`,
    {
      // Needed as disabled styling does not override button type styling.
      [`wb-${variants[variant]}--${colors[color]}`]: !disabled,
      'wb-btn--small': variants[variant] === variants.button,
      'wb-btn--full-width': fullWidth,
      'wb-btn--disabled': disabled,
    },
    classNameProp,
  );

  const Component = (href && 'a') || 'button';

  const componentProps = {};

  if (Component === 'a') {
    componentProps.href = href;
  }
  if (Component === 'button') {
    componentProps.type = type || 'button';
    componentProps.onClick = onClick;
    componentProps.disabled = disabled;
  }

  return (
    <Component
      className={cssClasses}
      {...componentProps}
    >
      {children}
    </Component>
  );
};

Button.propTypes = {
  /**
    Label for the button.
  */
  children: oneOfType([
    string,
    element,
  ]),
  /**
    Triggered when the button is clicked
  */
  onClick: func,
  /**
    The possible styled button components
  */
  variant: oneOf(Object.keys(variants)),
  /**
    Color for buttons
  */
  color: oneOf(Object.keys(colors)).isRequired,
  /**
    Button type property
  */
  type: string,
  /**
    Optional href attribute
  */
  href: string,
  /**
    Optional full-with behaviour
  */
  fullWidth: bool,
  /**
    Disabled boolean flag
  */
  disabled: bool,
  /**
    Additional classes
  */
  className: string,
  /**
    If true, the button is rendered as a "submit" button. If not, as button with type "button".
  */
  submit: bool,
};

Button.defaultProps = {
  onClick: () => {},
  variant: 'button',
  children: null,
  href: null,
  fullWidth: false,
  submit: false,
};

export default Button;
