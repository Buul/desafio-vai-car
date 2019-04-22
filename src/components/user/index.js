import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filter, findIndex } from 'lodash';
import { Collapse, Icon } from 'antd';
import api from '../../services/api';
import { Container, BoxDetails, BoxLocation } from './style';
import { Typography } from '../ui';
import { firstLetterUpper } from '../../helpers/string';
import { toggleSpinner, showMessageBox, showConfirmation } from '../../actions';
import Edit from './Edit';

const { Panel } = Collapse;

const customPanelStyle = {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 5,
  overflow: 'hidden',
};

const iconActionStyle = {
  display: 'inline',
  margin: '0 8px',
};

class User extends Component {
  state = {
    users: null,
    modalEdit: false,
    userSelected: null,
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const { spinner, showMessage } = this.props;
    spinner(true);
    try {
      const response = await api.get('?results=20');
      this.setState({ users: response.data.results });
      spinner(false);
    } catch (error) {
      console.error(error);
      showMessage({ message: [error], icon: 'error' });
      spinner(false);
    }
  };

  handleConfimDelete = id => {
    const { users } = this.state;
    const userFilter = filter(users, user => user.login.uuid !== id);
    this.setState({ users: userFilter });
  };

  handleConfirmEdit = data => {
    const { users, userSelected } = this.state;
    const index = findIndex(users, { login: { uuid: userSelected.login.uuid } });
    const usersEdit = users;
    usersEdit.splice(index, 1, {
      ...userSelected,
      name: {
        ...userSelected.name,
        first: data.first.toLowerCase(),
        last: data.last.toLowerCase(),
      },
    });
    this.setState({ users: usersEdit, modalEdit: false });
  };

  renderActions = user => {
    const { confirmation } = this.props;
    return (
      <>
        <div style={iconActionStyle}>
          <Icon
            type="delete"
            onClick={event => {
              confirmation({
                message: ['Are you sure you want to delete this item ?'],
                title: this.concatName({ first: user.name.first, last: user.name.last }),
                handleConfim: () => {
                  this.handleConfimDelete(user.login.uuid);
                },
              });
              event.stopPropagation();
            }}
          />
        </div>
        <div style={iconActionStyle}>
          <Icon
            type="edit"
            onClick={event => {
              event.stopPropagation();
              this.setState({ modalEdit: true, userSelected: user });
            }}
          />
        </div>
      </>
    );
  };

  concatName = name => `${firstLetterUpper(name.first)} ${firstLetterUpper(name.last)}`;

  render() {
    const { users, modalEdit, userSelected } = this.state;
    return (
      <Container>
        {users && (
          <>
            <div className="title">
              <Typography size={18} weight="600" lineheight="16" color="greenLight">
                User list
              </Typography>
            </div>
            <Collapse bordered={false}>
              {users.map(user => (
                <Panel
                  header={this.concatName({ first: user.name.first, last: user.name.last })}
                  key={user.login.uuid}
                  style={customPanelStyle}
                  extra={this.renderActions(user)}
                >
                  <BoxDetails user={user}>
                    <Collapse key={user.login.uuid}>
                      <Panel header="Location" key={user.login.uuid}>
                        <BoxLocation location={user.location} />
                      </Panel>
                    </Collapse>
                  </BoxDetails>
                </Panel>
              ))}
            </Collapse>
          </>
        )}
        {userSelected && (
          <Edit
            open={modalEdit}
            handleClose={() => {
              this.setState({ modalEdit: false });
            }}
            user={userSelected}
            confirmEdit={this.handleConfirmEdit}
          />
        )}
      </Container>
    );
  }
}

User.propTypes = {
  spinner: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  confirmation: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      spinner: toggleSpinner,
      showMessage: showMessageBox,
      confirmation: showConfirmation,
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(User);
