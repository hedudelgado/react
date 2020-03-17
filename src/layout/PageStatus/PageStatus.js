import React from 'react';
import {
  node,
  oneOf,
  string,
} from 'prop-types';
import classNames from 'classnames';
import BaseStyle from '../BaseStyle';
import Typography from '../Typography';
import Icon from '../Icon';
import './page-status.scss';

const PageStatus = ({
  ariaLive,
  variant,
  title,
  children,
  className,
  ...otherProps
}) => {
  const classes = classNames(
    'pi-page-status',
    `pi-page-status-${variant}`,
    className,
  );

  return title && children && (
    <BaseStyle data-test={`error-${variant}`} role="region" aria-live={ariaLive} component="div" className={classes} {...otherProps}>
      <Icon icon="disc-info-new" className="icon" />
      <Typography component="h5" className="title">
        {title}
      </Typography>
      <div className="message">
        {children}
      </div>
    </BaseStyle>
  );
};

PageStatus.propTypes = {
  /**
   * Variant defines the Page Status type.
   */
  variant: oneOf(['warning', 'error']).isRequired,
  /**
   * Aria-Live is used to set the priority with which a screen reader should treat
   * updates to live regions.
   * The possible settings are: off, polite or assertive.
   */
  ariaLive: oneOf(['polite', 'assertive', 'off']).isRequired,
  /**
   * An optional title in the Page Status.
   */
  title: string.isRequired,
  /**
   * The Page Status message. It is usually a text, but it can also be further DOM.
   */
  children: node,
};

PageStatus.defaultProps = {
  children: null,
};

export default PageStatus;
