import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { GoMarkGithub } from 'react-icons/go';
import { FaLinkedin } from 'react-icons/fa';
import pxToRem from '../../helpers/scales';

const Content = styled.div`
  cursor: pointer;
  margin: 0 ${pxToRem(10)};
`;

function renderIcon(icon) {
  switch (icon) {
    case 'linkedin':
      return <FaLinkedin size={35} color="#FFFFFF" />;
    case 'github':
      return <GoMarkGithub size={35} color="#FFFFFF" />;
    default:
      return null;
  }
}

const IconButtonUI = ({ icon, link }) => (
  <Content
    onClick={() => {
      window.open(link, '_blank');
    }}
  >
    {renderIcon(icon)}
  </Content>
);

IconButtonUI.propTypes = {
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default IconButtonUI;
