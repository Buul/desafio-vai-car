import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import { Modal, Button } from '../ui';
import { Container, Message, Line, MessageContent } from './style';

class Confirmation extends Component {
  state = {
    openState: true,
  };

  componentWillReceiveProps(nextProps) {
    const { openState } = this.state;

    if (nextProps.open !== undefined && openState !== nextProps.open) {
      this.setState({ openState: nextProps.open });
    }
  }

  handleClose = () => {
    const { open, onCloseModal } = this.props;

    if (open === undefined) {
      this.setState({ openState: false });
    }
    onCloseModal();
  };

  render() {
    const { openState } = this.state;
    const { open, message, title, handleConfim } = this.props;
    return (
      <Modal
        title={title}
        open={open === undefined ? openState : open}
        onCloseModal={this.handleClose}
      >
        <Container margin="0">
          <MessageContent marginTop="0">
            {message && message.map(item => <Message key={uniqueId()}>{item}</Message>)}
          </MessageContent>
          <Line />
          <div className="action">
            <Button type="default" height={30} width="50%" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              height={30}
              width="50%"
              onClick={() => {
                handleConfim();
                this.handleClose();
              }}
            >
              Confirm
            </Button>
          </div>
        </Container>
      </Modal>
    );
  }
}
Confirmation.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.arrayOf(PropTypes.string),
  onCloseModal: PropTypes.func.isRequired,
  handleConfim: PropTypes.func.isRequired,
  title: PropTypes.string,
};
Confirmation.defaultProps = {
  open: undefined,
  message: [],
  title: '',
};

export default Confirmation;
