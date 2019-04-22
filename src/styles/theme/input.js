import pxToRem from '../../helpers/scales';

const input = {
  font: {
    size: pxToRem(20),
  },
  border: {
    color: {
      primary: '#02bfa4',
    },
  },
  hover: {
    border: {
      color: {
        primary: '#00898b',
        error: '#F95E5A',
      },
    },
  },
};

export default input;
