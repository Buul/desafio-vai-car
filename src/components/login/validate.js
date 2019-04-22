import { validaEmail } from '../../helpers/validate';

const validate = (values, newPass = false) => {
  const errors = {};
  if (!newPass) {
    if (!validaEmail(values.email)) errors.email = 'E-mail is invalid';
    if (!values.email) errors.email = 'E-mail is required';
    if (!values.password) errors.password = 'Password is required';
  } else {
    if (!values.newPassword) errors.newPassword = 'New password is required';
    if (!values.repeatNewPassword) errors.repeatNewPassword = 'Repeat new password is required';
    if (values.repeatNewPassword !== values.newPassword)
      errors.repeatNewPassword = 'Passwords are not identical';
  }

  return errors;
};

export default validate;
