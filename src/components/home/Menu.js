/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Typography } from '../ui';
import { ItemMenu } from './style';
import { logout } from '../../services/auth';

const Menu = () => (
  <>
    <ItemMenu>
      <Typography size={12} lineheight="14">
        <div className="link">Edit</div>
      </Typography>
    </ItemMenu>
    <ItemMenu>
      <Typography size={12} lineheight="14">
        <div
          className="link"
          onClick={() => {
            logout();
            window.location.reload();
          }}
        >
          Logout
        </div>
      </Typography>
    </ItemMenu>
  </>
);

export default Menu;
