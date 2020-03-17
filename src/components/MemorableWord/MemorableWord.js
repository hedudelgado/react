import React, { Component } from 'react';
import { object, func } from 'prop-types';
import Typography from '../../layout/Typography';
import Button from '../../layout/Button';
import BaseStyle from '../../layout/BaseStyle';
import Input from '../../layout/Input';
import { validateMemorableWord } from '../../utils/validations';
import { tetherLogin, resetMemorableWord } from '../../utils/api';
import { MEMORABLE_WORD_ERROR, MEMORABLE_WORD_VIEW } from '../App/appActions';
import Notification from '../../layout/Notification';

class MemorableWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      touched: false,
      memorableWord: '',
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { profile: { business: { tetheredGuid: guid } }, setNotificationMessage } = this.props;
    const { memorableWord } = this.state;
    e.preventDefault();
    tetherLogin(guid).then(({
      sessionId: worldlineSession,
      sharedSecret: secret,
    }) => resetMemorableWord({
      worldlineSession,
      secret,
      memorableWord,
    }).then(() => {
      setNotificationMessage(MEMORABLE_WORD_VIEW);
      this.setState({ memorableWord: '' });
    })).catch(() => {
      setNotificationMessage(MEMORABLE_WORD_ERROR);
    });
  }

  handleBlur({ target: { value: memorableWord } }) {
    this.setState({
      error: validateMemorableWord(memorableWord),
      touched: true,
    });
  }

  handleChange({ target: { value: memorableWord } }) {
    this.setState({
      error: validateMemorableWord(memorableWord),
      memorableWord,
    });
  }

  render() {
    const { dictionary, app: { notificationMessage } } = this.props;
    const { error, touched, memorableWord } = this.state;
    return (
      <BaseStyle component="section" className="component-container">
        {notificationMessage === MEMORABLE_WORD_ERROR && (
          <Notification data-test="error-notification" priority={2} variant="error" ariaLive="polite" show>
            {dictionary['generic.error']}
          </Notification>
        )}
        {notificationMessage === MEMORABLE_WORD_VIEW && (
          <Notification data-test="success-message" priority={2} variant="success" ariaLive="polite" show>
            {dictionary['update.success.message']}
          </Notification>
        )}
        <Typography component="h4" className="pi-color-greyscale-darkest">
          {dictionary['memorable.word.title']}
        </Typography>
        <Typography component="p" mb="3">{dictionary['memorable.word.body']}</Typography>
        <form name="memorable-word-form" onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            error={dictionary[error]}
            touched={touched}
            type="password"
            name="memorableWord"
            value={memorableWord}
            placeholder={dictionary['memorable.word.placeholder']}
          />
          <Button data-test="update-memorable-word" color="secondary" mt="2" type="submit" fullWidth>
            {dictionary['memorable.word.submit']}
          </Button>
        </form>
      </BaseStyle>
    );
  }
}

MemorableWord.propTypes = {
  dictionary: object.isRequired,
  profile: object.isRequired,
  app: object.isRequired,
  setNotificationMessage: func.isRequired,
};

export default MemorableWord;
