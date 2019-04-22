/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import 'babel-polyfill';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, BoxLogin, Links, Line } from './style';
import logo from '../../../assets/vaicar.png';
import Cognito from '../../services/cognito';
import { Input, Button, Typography } from '../ui';
import validate from './validate';
import { toggleSpinner, showMessageBox } from '../../actions';
import AuthAccount from './AuthAccount';
import { login } from '../../services/auth';

class LoginPage extends Component {
  state = {
    errors: {
      email: '',
      password: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    form: {
      email: '',
      password: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    newPass: false,
    modalVerificationCode: false,
    user: {},
  };

  keyHandler = e => {
    if (e.key === 'Enter') this.formValidation('login');
  };

  login = async form => {
    const { spinner, showMessage, history } = this.props;
    spinner(true);
    try {
      const response = await Cognito.authenticateUser(form.email, form.password);
      if (response.newPass) {
        this.setState({
          newPass: true,
        });
      } else {
        login(response.jwtToken);
        history.push('/home');
      }
      spinner(false);
    } catch (returnError) {
      console.error(returnError.Error.desc);
      showMessage({ message: returnError.Error.desc, icon: 'error' });
      spinner(false);
    }
  };

  signUp = async form => {
    const { spinner, showMessage } = this.props;
    spinner(true);
    try {
      const response = await Cognito.signUp(form.email, form.password);

      this.setState({
        modalVerificationCode: true,
        user: { email: response.data.user.username, username: response.data.userSub },
      });
      spinner(false);
    } catch (returnError) {
      console.error(returnError.Error.desc);
      showMessage({ message: returnError.Error.desc, icon: 'error' });
      spinner(false);
    }
  };

  confirmRegistration = async verificationCode => {
    const { spinner, showMessage, history } = this.props;
    const { user } = this.state;
    spinner(true);
    try {
      const response = await Cognito.confirmRegistration(user.username, verificationCode);
      login(response.jwtToken);
      history.push('/home');
    } catch (returnError) {
      console.error(returnError.Error.desc);
      showMessage({ message: returnError.Error.desc, icon: 'error' });
      spinner(false);
    }
  };

  confirmNewPass = async form => {
    const errors = validate(form, true);
    if (isEmpty(errors)) {
      const { spinner, showMessage } = this.props;
      spinner(true);
      try {
        await Cognito.newPass(form.email, form.password, form.newPassword);
        showMessage({ message: ['Senha criada com sucesso'], icon: 'success' });
        this.setState({
          newPass: false,
        });
        spinner(false);
      } catch (returnError) {
        console.error(returnError.Error.desc);
        showMessage({ message: returnError.Error.desc, icon: 'error' });
        spinner(false);
      }
    } else {
      this.setState({ errors });
    }
  };

  formValidation = action => {
    const { form } = this.state;
    const errors = validate(form);
    if (isEmpty(errors)) {
      if (action === 'login') this.login(form);
      else this.signUp(form);
    } else {
      this.setState({ errors });
    }
  };

  handleChange = event => {
    const { form, errors } = this.state;
    this.setState({
      form: {
        ...form,
        [event.target.name]: event.target.value,
      },
      errors: { ...errors, [event.target.name]: '' },
    });
  };

  handleSubmit = action => {
    this.formValidation(action);
  };

  handleConfirmVerificationCode = verificationCode => {
    this.confirmRegistration(verificationCode);
  };

  renderNewPass = data => (
    <>
      <Input
        errortext={data.errors.newPassword}
        label="New password "
        name="newPassword"
        type="password"
        onChange={this.handleChange}
        value={data.form.newPassword || ''}
        onKeyUp={this.keyHandler}
      />
      <Input
        errortext={data.errors.repeatNewPassword}
        label="Repeat new password"
        name="repeatNewPassword"
        type="password"
        onChange={this.handleChange}
        value={data.form.repeatNewPassword || ''}
        onKeyUp={this.keyHandler}
      />
    </>
  );

  renderLogin = data => (
    <>
      <Input
        errortext={data.errors.email}
        label="E-mail"
        name="email"
        onChange={this.handleChange}
        value={data.form.email || ''}
        onKeyUp={this.keyHandler}
      />
      <Input
        errortext={data.errors.password}
        label="Password"
        name="password"
        type="password"
        onChange={this.handleChange}
        value={data.form.password || ''}
        onKeyUp={this.keyHandler}
      />
    </>
  );

  render() {
    const { form, errors, newPass, modalVerificationCode, user } = this.state;
    return (
      <Container>
        <img src={logo} alt="logo" />
        <BoxLogin>
          <div className="title">{(!newPass && 'Login') || 'Create new password'}</div>
          <Line />
          <div className="form">
            {(!newPass && this.renderLogin({ errors, form })) ||
              this.renderNewPass({ errors, form })}
            <div style={{ marginTop: 10 }} />
            {(!newPass && (
              <>
                <Button onClick={() => this.handleSubmit('login')}>Confirm</Button>
                <Links>
                  <Typography size={11} weight="600" lineheight="14">
                    <div className="link" onClick={() => this.handleSubmit('signUp')}>
                      Sign up
                    </div>
                  </Typography>
                  <Typography size={11} weight="600" lineheight="14">
                    <div className="link">Remember password</div>
                  </Typography>
                </Links>
              </>
            )) || <Button onClick={() => this.confirmNewPass(form)}>Save</Button>}
          </div>
        </BoxLogin>
        <AuthAccount
          open={modalVerificationCode}
          user={user}
          handleClose={() => {
            this.setState({ modalVerificationCode: false });
          }}
          handleConfirmVerificationCode={this.handleConfirmVerificationCode}
        />
      </Container>
    );
  }
}

LoginPage.propTypes = {
  spinner: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      spinner: toggleSpinner,
      showMessage: showMessageBox,
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(LoginPage);
