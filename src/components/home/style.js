import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pxToRem from '../../helpers/scales';

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const HeaderStyle = styled.div`
  align-items: center;
  display: flex;
  height: ${pxToRem(80)};
  justify-content: space-between;
  padding-right: ${pxToRem(40)};
  img {
    width: 100%;
    height: 100%;
  }

  .logo {
    height: ${pxToRem(80)};
    width: ${pxToRem(150)};
  }

  .avatar {
    cursor: pointer;
  }
`;

const ItemMenuStyle = styled.div`
  margin: ${pxToRem(15)} ${pxToRem(10)};
`;

const FooterStyle = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.greyDark};
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  height: ${pxToRem(150)};
  padding: 0 ${pxToRem(40)};

  .link-footer {
    display: flex;
    margin-bottom: ${pxToRem(20)};
  }

  @media ${props => props.theme.device.md} {
    flex-direction: row;
    justify-content: space-between;
    height: ${pxToRem(100)};

    .link-footer {
      margin-bottom: 0;
    }
  }
`;

export const Container = ({ children }) => <ContainerStyle>{children}</ContainerStyle>;

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

const LineStyle = styled.div`
  background-color: ${props => props.theme.colors.greyLight};
  height: ${pxToRem(1)};
  width: 100%;
`;

export const Header = ({ children }) => (
  <div>
    <HeaderStyle>{children}</HeaderStyle>
    <LineStyle />
  </div>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ItemMenu = ({ children }) => <ItemMenuStyle>{children}</ItemMenuStyle>;

ItemMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Footer = ({ children }) => <FooterStyle>{children}</FooterStyle>;

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};
