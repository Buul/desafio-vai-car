import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Modal } from '../ui';
import { firstLetterUpper } from '../../helpers/string';

class Edit extends Component {
  state = {
    form: {
      first: '',
      last: '',
    },
    errors: {
      first: '',
      last: '',
    },
  };

  componentDidMount() {
    const { user } = this.props;
    this.formFill(user);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = this.props;
    if (nextProps.user !== user) this.formFill(nextProps.user);
  }

  formFill = user => {
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        first: firstLetterUpper(user.name.first),
        last: firstLetterUpper(user.name.last),
      },
    });
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

  concatName = name => `${firstLetterUpper(name.first)} ${firstLetterUpper(name.last)}`;

  render() {
    const { form, errors } = this.state;
    const { open, handleClose, user, confirmEdit } = this.props;
    return (
      <Modal
        open={open}
        onCloseModal={() => handleClose()}
        title={this.concatName({ first: user.name.first, last: user.name.last })}
        size={350}
      >
        <Input
          errortext={errors.first}
          label="First name"
          name="first"
          onChange={this.handleChange}
          value={form.first || ''}
        />
        <Input
          errortext={errors.last}
          label="Last name"
          name="last"
          onChange={this.handleChange}
          value={form.last || ''}
        />
        <Button onClick={() => confirmEdit(form)}>Confirmar</Button>
      </Modal>
    );
  }
}

Edit.propTypes = {
  open: PropTypes.bool,
  user: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
  }),
  handleClose: PropTypes.func.isRequired,
  confirmEdit: PropTypes.func.isRequired,
};

Edit.defaultProps = {
  open: false,
  user: null,
};

export default Edit;
