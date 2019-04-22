import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pxToRem from '../../helpers/scales';

const ContainerStyle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  @media ${props => props.theme.device.md} {
    justify-content: center;
  }
`;

const BoxLoginStyle = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.greyLight};
  display: flex;
  flex-direction: column;
  width: 100%;

  .form {
    align-items: center;
    flex-direction: column;
    display: flex;
    padding: ${pxToRem(20)} ${pxToRem(70)};
    width: 100%;
  }

  .title {
    font-size: ${pxToRem(18)};
    font-weight: bold;
    margin: ${pxToRem(10)} 0;
  }

  .links {
    display: flex;
    justify-content: space-between;
  }

  @media ${props => props.theme.device.md} {
    border-radius: ${pxToRem(12)};
    width: ${pxToRem(400)};
  }
`;

const BoxLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${pxToRem(10)};
  width: 100%;
`;

const LineStyle = styled.div`
  background-color: ${props => props.theme.colors.white};
  height: ${pxToRem(1)};
  margin-bottom: ${pxToRem(10)};
  width: 100%;
`;

export const Container = ({ children }) => <ContainerStyle>{children}</ContainerStyle>;

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export const BoxLogin = ({ children }) => <BoxLoginStyle>{children}</BoxLoginStyle>;

BoxLogin.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Links = ({ children }) => <BoxLinks>{children}</BoxLinks>;

Links.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Line = () => <LineStyle />;
