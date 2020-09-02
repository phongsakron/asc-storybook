import React, { useState, useEffect } from 'react';
import { customizableComponent } from '../hoks/customization';
import { LayoutHeader, Username, DropdownIcon, DropDownContainer } from './styles';
import Avatar from '../Avatar';
import Popover from '../commonComponents/Popover';
import Menu, { MenuItem } from '../commonComponents/Menu';

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const username = 'Jackies';

  return (
    <LayoutHeader>
      <div onClick={() => setIsOpen(!isOpen)}>
        <Avatar />
      </div>
      <Username>{username}</Username>
      <Popover
        position="bottom"
        isOpen={isOpen}
        align="end"
        content={
          <Menu>
            <MenuItem>Log out</MenuItem>
          </Menu>
        }
      >
        <DropDownContainer onClick={() => setIsOpen(!isOpen)}>
          <DropdownIcon />
        </DropDownContainer>
      </Popover>
    </LayoutHeader>
  );
};

export default customizableComponent('Layout')(Layout);
