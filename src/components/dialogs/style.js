import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pxToRem from '../../helpers/scales';

const ContainerStyle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: ${props => props.margin};

  .action {
    display: flex;

    div {
      margin: 0 ${pxToRem(14)};
    }
  }
`;

const MessageContentStyle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: ${props => props.marginTop};
`;

const MessageStyle = styled.div`
  font-size: ${pxToRem(14)};
  font-weight: 600;
  line-height: ${pxToRem(12)};
  margin: ${pxToRem(10)} 0;
`;

const LineStyle = styled.div`
  background-color: ${props => props.theme.colors.greyLight};
  height: ${pxToRem(1)};
  width: 100%;
  margin: ${pxToRem(24)} 0;
`;

export const Container = ({ children, margin }) => (
  <ContainerStyle margin={margin}> {children}</ContainerStyle>
);

Container.propTypes = {
  margin: PropTypes.string,
  children: PropTypes.node.isRequired,
};
Container.defaultProps = {
  margin: `${pxToRem(28)} ${pxToRem(30)} ${pxToRem(4)}`,
};

export const Message = ({ children }) => <MessageStyle>{children}</MessageStyle>;

Message.propTypes = {
  children: PropTypes.node.isRequired,
};

export const MessageContent = ({ children, marginTop }) => (
  <MessageContentStyle marginTop={marginTop}>{children}</MessageContentStyle>
);

MessageContent.propTypes = {
  marginTop: PropTypes.string,
  children: PropTypes.node.isRequired,
};

MessageContent.defaultProps = {
  marginTop: `${pxToRem(18)}`,
};

export const Line = () => <LineStyle />;
