import pxToRem from '../../helpers/scales';

const button = {
  font: {
    color: {
      primary: '#FFFFFF',
      secundary: '#4F74AA',
      default: '#333',
    },
  },
  border: {
    primary: 'none',
    secundary: `${pxToRem(2)} solid #AEC3E3`,
    default: `${pxToRem(1)} solid #333`,
  },
  background: {
    color: {
      primary: '#02bfa4',
      secundary: '#E6ECF8',
      danger: 'red',
      default: '#ffffff',
    },
  },
  hover: {
    background: {
      color: {
        primary: '#00898b',
        secundary: '#E6ECF8',
        default: '#F8F8F8',
      },
    },
    border: {
      primary: 'none',
      secundary: `${pxToRem(2)} solid #7C9BC9`,
    },
  },
  click: {
    background: {
      color: {
        primary: '#00768b',
        default: '#F0F0F0',
      },
    },
    border: {
      primary: 'none',
      secundary: `${pxToRem(2)} solid #4F74AA`,
    },
  },
  disabled: {
    font: {
      color: '#AEC3E3',
    },
    background: {
      color: {
        primary: '#7C9BC9',
        secundary: '#AEC3E3',
      },
    },
  },
};

export default button;
