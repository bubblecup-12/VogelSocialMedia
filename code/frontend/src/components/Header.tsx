import "./header.css";
import React, { useState, useRef, useEffect } from "react";
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, SwipeableDrawer } from '@mui/material';
import Box from '@mui/material/Box';
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { Height } from "@mui/icons-material";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const iconRef = useRef<HTMLImageElement>(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const iconList = [InboxIcon, MailIcon, InboxIcon, MailIcon, InboxIcon, MailIcon];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setIsOpen(false)}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              {React.createElement(iconList[index])}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="outest-container" >
      <header className="base-header">
        <div className="header-icon"> <img src='/assets/icons/feather_orange.svg' alt="featherIcon" /> </div>
        <p className="header-title">
          FeatherFeed
        </p>
        <div className="header-icon"> {isOpen? <img src='/assets/icons/close_orange.svg' alt="close menu" ref={iconRef} onClick={toggleMenu}/> : <img src='/assets/icons/menu_orange.svg' alt="menu" onClick={toggleMenu}  />} </div>
      </header>
      <SwipeableDrawer
      anchor={"right"}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      {DrawerList}
    </SwipeableDrawer>
    </div>
  );
}



// EXPORT VARIABLES
export default Header;