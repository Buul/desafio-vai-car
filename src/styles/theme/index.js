import input from './input';
import button from './button';
import iconCircle from './iconCircle';

const size = {
  sm: '576px',
  md: '768px',
  lg: '1040px',
  xl: '1240px',
  xxl: '9999px',
};

const theme = {
  colors: {
    primary: '#54a0ff',
    danger: '#ff6b6b',
    info: '#48dbfb',
    success: '#00A66B',
    default: '#576574',
    white: '#ffffff',
    black: '#1F2A41',
    greenLight: '#02bfa4',
    greyLight: '#EBEAED',
    greyMedium: '#35424d',
    greyDark: '#222529',
    blueLight: '#E6ECF8',
    blueMedium: '#445A93',
    blueDark: '#284E86',
    hover: {
      primary: '#AEC3E3',
    },
    disabled: {
      text: '#999DAF',
    },
    error: '#F95E5A',
  },
  device: {
    sm: `(min-width: ${size.sm})`,
    md: `(min-width: ${size.md})`,
    lg: `(min-width: ${size.lg})`,
    xl: `(min-width: ${size.xl})`,
    xxl: `(min-width: ${size.xxl})`,
  },
  input,
  button,
  iconCircle,
};

export default theme;
