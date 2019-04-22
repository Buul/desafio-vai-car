/* eslint-disable import/no-unresolved */
import React from 'react';
import { Avatar, Popover } from 'antd';

import { Header, Container, Footer } from './style';
import logo from '../../../assets/vaicar.png';
import Menu from './Menu';
import { Typography, IconButton } from '../ui';
import User from '../user';

const home = () => (
  <Container>
    <Header>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div />
      <div className="avatar">
        <Popover placement="bottomRight" title="Menu" content={<Menu />} trigger="click">
          <Avatar style={{ backgroundColor: '#02bfa4' }} icon="user" />
        </Popover>
      </div>
    </Header>
    <User />
    <Footer>
      <Typography size={16} weight="400" lineheight="16" color="greyMedium">
        © 2019 Paulo Otavio Firmino Silva
      </Typography>
      <div />
      <div className="link-footer">
        <IconButton icon="github" link="https://github.com/Buul" />
        <IconButton icon="linkedin" link="https://www.linkedin.com/in/paulofirmino/" />
      </div>
    </Footer>
  </Container>
);

export default home;
