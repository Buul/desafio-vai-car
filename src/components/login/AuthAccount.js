import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Typography, Modal } from '../ui';

class AuthAccount extends Component {
  state = {
    verificationCode: '',
    error: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: '',
    });
  };

  confirmVerificationCode = (verificationCode, handleConfirmVerificationCode) => {
    if (!verificationCode) {
      this.setState({ error: 'Verification Code is required' });
    } else {
      handleConfirmVerificationCode(verificationCode);
    }
  };

  render() {
    const { verificationCode, error } = this.state;
    const { open, handleClose, user, handleConfirmVerificationCode } = this.props;
    return (
      <Modal open={open} onCloseModal={() => handleClose()} title="User Authentication" size={350}>
        <Input
          errortext={error}
          label="Verification Code"
          name="verificationCode"
          onChange={this.handleChange}
          value={verificationCode || ''}
        />
        <Button
          onClick={() =>
            this.confirmVerificationCode(verificationCode, handleConfirmVerificationCode)
          }
        >
          Confirm
        </Button>
        <Typography size={16} lineheight="16" margin="20px 0" textalign="center" color="greenLight">
          {`Enter the code we send to email ${user.email}`}
        </Typography>
      </Modal>
    );
  }
}

AuthAccount.propTypes = {
  open: PropTypes.bool,
  user: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
  }),
  handleClose: PropTypes.func.isRequired,
  handleConfirmVerificationCode: PropTypes.func.isRequired,
};
AuthAccount.defaultProps = {
  open: false,
  user: {
    email: '',
    username: '',
  },
};

export default AuthAccount;
