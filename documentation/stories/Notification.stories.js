import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, withKnobs } from '@storybook/addon-knobs';
import Notification from '../../src/layout/Notification';

storiesOf('Notifications', module)
  .addDecorator(withKnobs)
  .add('Preview', () => {
    const title = 'Random title';
    const children = 'This is the main notification text.';

    return (
      <Fragment>
        <h1>Notification</h1>
        <h2 className="mt3 border-bottom">Priority 1</h2>
        <Notification
          ariaLive="off"
          priority={1}
          variant="error"
          title={title}
          show
        >
          {children}
          <a className="block mt1 error-link" href="javacript:;">Retry</a>
        </Notification>
        {
          [2, 3, 4, 5].map(priority => (
            <Fragment key={priority}>
              <h2 className="mt3 border-bottom">
                {`Priority ${priority}`}
              </h2>
              {
                ['Warning', 'Error', 'Info', 'Success'].map(variant => (
                  <Fragment key={variant}>
                    <h3>{variant}</h3>
                    <Notification
                      ariaLive="off"
                      priority={priority}
                      variant={variant.toLowerCase()}
                      title={title}
                      show
                    >
                      {children}
                    </Notification>
                  </Fragment>
                ))
              }
            </Fragment>
          ))
        }
      </Fragment>
    );
  })
  .add('Notification', () => {
    const priorities = [1, 2, 3, 4, 5];
    const priority = select('priority*', priorities, priorities[0]);
    const variants = ['warning', 'error', 'info', 'success'];
    const variant = select('variant*', variants, variants[0]);
    const ariaLiveValues = ['off', 'polite', 'assertive'];
    const ariaLive = select('ariaLive*', ariaLiveValues, ariaLiveValues[0]);
    const title = text('title', '');
    const children = text('children (body)', 'This is the main notification text.');
    const sticky = select('sticky', [true, false], false);
    const show = select('show', [true, false], true);

    return (
      <Notification
        ariaLive={ariaLive}
        priority={priority}
        variant={variant}
        title={title}
        sticky={sticky}
        show={show}
      >
        {children}
        {priority === 1 && <a className="block mt1 error-link" href="javacript:;">Retry</a>}
      </Notification>
    );
  });
