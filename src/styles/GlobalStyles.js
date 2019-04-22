import React from 'react';
import { createGlobalStyle } from 'styled-components';

const Styles = createGlobalStyle`
html {
     @media ${props => props.theme.device.xxl} {
     font-size: 19px !important;
    }

    @media ${props => props.theme.device.lg} {
     font-size: 18px !important;
    }

    @media ${props => props.theme.device.md} {
     font-size: 17px !important;
    } 
}

`;

const GlobalStyles = () => <Styles />;

export default GlobalStyles;
