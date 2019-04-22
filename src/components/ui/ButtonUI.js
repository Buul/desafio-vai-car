import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pxToRem from '../../helpers/scales';

const ButtonStyle = styled.div`
  align-items: center;
  background-color: ${props => props.theme.button.background.color[props.type]};
  color: ${props => props.theme.button.font.color[props.type]};
  cursor: pointer;
  border: ${props => props.theme.button.border[props.type]};
  border-radius: ${props => (props.inputButton ? `0 ${pxToRem(5)} ${pxToRem(5)} 0` : pxToRem(5))};
  display: flex;
  font-size: ${pxToRem(14)};
  font-weight: 600;
  height: ${props => pxToRem(props.height)};
  justify-content: center;
  padding: ${props => (props.inputButton ? `0 ${pxToRem(10)}` : `0 ${pxToRem(35)}`)};
  user-select: none;
  width: ${props => props.width};
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  :hover {
    background-color: ${props => props.theme.button.hover.background.color[props.type]};
    border: ${props => props.theme.button.hover.border[props.type]};
  }
  :active {
    background-color: ${props => props.theme.button.click.background.color[props.type]};
    border: ${props => props.theme.button.click.border[props.type]};
  }

  ${props =>
    props.disabled
      ? `
         background-color: ${props.theme.button.disabled.background.color[props.type]};
         color: ${props.theme.button.disabled.font.color[props.type]};
         cursor: inherit;
         :hover{
          background-color: ${props.theme.button.disabled.background.color[props.type]};
        }
        :active {
          background-color: ${props.theme.button.disabled.background.color[props.type]};
        }
        `
      : ''};
`;

const ButtonUI = ({ children, type, disabled, onClick, inputButton, height, width }) => (
  <ButtonStyle
    disabled={disabled}
    type={type}
    inputButton={inputButton}
    height={height}
    width={width}
    onClick={disabled ? () => {} : () => onClick()}
  >
    {children}
  </ButtonStyle>
);

ButtonUI.propTypes = {
  children: PropTypes.node.isRequired,
  inputButton: PropTypes.bool,
  type: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.number,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

ButtonUI.defaultProps = {
  type: 'primary',
  disabled: false,
  inputButton: false,
  height: 30,
  width: '100%',
};

export default ButtonUI;
