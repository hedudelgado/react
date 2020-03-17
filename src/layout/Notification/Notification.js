import React from 'react';
import {
  bool,
  node,
  oneOf,
  string,
} from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import BaseStyle from '../BaseStyle';
import Typography from '../Typography';
import './notification.scss';

const variants = {
  warning: {
    className: 'warning',
    icon: 'disc-info-new',
  },
  error: {
    className: 'error',
    icon: 'disc-info-new',
  },
  success: {
    className: 'success',
    icon: 'tick',
  },
  info: {
    className: 'info',
    icon: 'disc-info-new',
  },
};

const Notification = ({
  priority,
  variant,
  ariaLive,
  show,
  sticky,
  title,
  children,
  className,
  ...otherProps
}) => {
  const classes = classNames(
    'pi-notification',
    `priority-${priority}`,
    `priority-${priority}-${variants[variant].className}`,
    (sticky && 'sticky'),
    className,
  );

  return show && children && (
    <BaseStyle component="div" role="region" aria-live={ariaLive} className={classes} {...otherProps}>
      <Icon icon={variants[variant].icon} className="icon" />
      <div className="content">
        {title && <Typography component="span" className="title">{title}</Typography>}
        {children}
      </div>
    </BaseStyle>
  );
};

Notification.propTypes = {
  /**
   * Priority defines the style of the Notification based on importance.
   * 1 is the highest priority and 5 the lowest.
   * Priority 1 supports only Errors.
   * Tip: `.error-link` className in a Priority 1's child anchor tag or button, will style it
   * like in the example.
   */
  priority: oneOf([1, 2, 3, 4, 5]).isRequired,
  /**
   * Variant defines the Notification's purpose.
   */
  variant: oneOf(['warning', 'error', 'success', 'info']).isRequired,
  /**
   * Aria-Live is used to set the priority with which a screen reader should treat
   * updates to live regions.
   * The possible settings are: off, polite or assertive.
   */
  ariaLive: oneOf(['polite', 'assertive', 'off']).isRequired,
  /**
   * A boolean value which displays or hides the Notification.
   */
  show: bool,
  /**
   * A boolean value which which pins the Notification to top of the page.
   */
  sticky: bool,
  /**
   * An optional title in the Notification.
   */
  title: string,
  /**
   * The Notification contents. It is usually a text, but it can also be further DOM.
   */
  children: node,
};

Notification.defaultProps = {
  show: false,
  sticky: false,
  title: '',
  children: null,
};

export default Notification;
