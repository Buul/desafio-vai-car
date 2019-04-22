import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar } from 'antd';
import Moment from 'react-moment';
import 'moment-timezone';
import pxToRem from '../../helpers/scales';
import { firstLetterUpper } from '../../helpers/string';

const ContainerStyle = styled.div`
  padding: ${pxToRem(30)} ${pxToRem(20)};
  .title {
    display: flex;
    justify-content: center;
    margin-bottom: ${pxToRem(20)};
  }

  @media ${props => props.theme.device.md} {
    padding: ${pxToRem(30)} ${pxToRem(300)};
  }
`;

const BoxDetailsStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${pxToRem(10)};
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${pxToRem(5)};
  width: 100%;

  .email {
    font-size: ${pxToRem(14)};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Column = styled.div`
  align-items: center;
  display: flex;
  font-size: ${pxToRem(12)};
  font-weight: 400;
  margin-bottom: ${pxToRem(8)};
  width: ${props => props.width};

  span {
    font-weight: bold;
    margin-left: ${pxToRem(5)};
  }
`;

// eslint-disable-next-line react/prop-types
export const Container = ({ children }) => <ContainerStyle>{children}</ContainerStyle>;

export const BoxDetails = ({ children, user }) => (
  <BoxDetailsStyle>
    <Header>
      <div className="email">{user.email}</div>
      <div />
      <Avatar src={user.picture.medium} size="large" />
    </Header>
    <Content>
      <Column width="100%">
        Birthdate:
        <span>
          <Moment format="YYYY/MM/DD">{user.dob.date}</Moment>
        </span>
      </Column>
      <Column width="100%">
        Phone:
        <span>{user.phone} </span>
      </Column>
      {children}
    </Content>
  </BoxDetailsStyle>
);

BoxDetails.propTypes = {
  user: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
};

BoxDetails.defaultProps = {
  user: {},
};

export const BoxLocation = ({ location }) => (
  <BoxDetailsStyle>
    <Content>
      <Column width="100%">
        Street:
        <span>{firstLetterUpper(location.street)}</span>
      </Column>
      <Column width="50%">
        City:
        <span>{firstLetterUpper(location.city)}</span>
      </Column>
      <Column width="50%">
        State:
        <span>{firstLetterUpper(location.state)}</span>
      </Column>
    </Content>
  </BoxDetailsStyle>
);

BoxLocation.propTypes = {
  location: PropTypes.shape({}),
};

BoxLocation.defaultProps = {
  location: {},
};
