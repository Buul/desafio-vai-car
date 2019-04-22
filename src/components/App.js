import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import { MessageBox, Confirmation } from './dialogs';
import Routes from '../routes';
import Styles from '../styles/GlobalStyles';
import { removeDialog } from '../actions';

import { LoadingOverlay } from './ui';

class App extends Component {
  loaderStyle = {
    width: '100%',
    height: '100%',
    display: 'inline-table',
    position: 'absolute',
  };

  render() {
    const { busy, dialogs, removeDialogAction } = this.props;
    return (
      <LoadingOverlay spinner active={busy} style={this.loaderStyle}>
        <Routes />
        <Styles />
        {dialogs.map(dialog => {
          let componentClass = null;
          switch (dialog.type) {
            case 'MessageBox':
              componentClass = MessageBox;
              break;
            case 'Confirmation':
              componentClass = Confirmation;
              break;
            default:
          }
          if (!componentClass) {
            return null;
          }
          return React.createElement(componentClass, {
            key: uniqueId(),
            onCloseModal: () => removeDialogAction(dialog),
            ...dialog,
          });
        })}
      </LoadingOverlay>
    );
  }
}

App.propTypes = {
  busy: PropTypes.bool,
  dialogs: PropTypes.arrayOf(PropTypes.shape({})),
  removeDialogAction: PropTypes.func.isRequired,
};

App.defaultProps = {
  busy: false,
  dialogs: [],
};

const mapStateToProps = state => ({
  busy: Boolean(state.busyCounterReducer),
  dialogs: state.dialogReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeDialogAction: removeDialog,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
