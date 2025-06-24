import "./header.css";
import React, { useState, useRef } from "react";
import { createTheme, List, ListItem, ListItemButton, ListItemIcon, ListItemText, StyledEngineProvider, SwipeableDrawer, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const iconRef = useRef<HTMLImageElement>(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // TODO
  const logOut = async () => {
    try {
    const response = await axios.delete("http://localhost:3001/api/user/logout");
    } catch (err: any) {
      console.error("error: ", err.response.data);
    }
  };
  const iconList = [DynamicFeedIcon, AddAPhotoIcon, PersonIcon, InfoIcon, LogoutIcon];
  const routerLinksList = ["/","/createpost","/profile","/about","/"]

  const DrawerList = (
    <StyledEngineProvider injectFirst>
    <Box role="menu" onClick={() => setIsOpen(false)}>
      <List className="drawer-list">
        {["Feed", "Create Post", "Profile", "About Us"].map((text, index) => (
          <ListItem className="drawer-list-item" key={text} disablePadding>
            <ListItemButton className="drawer-list-item-button" component={Link} to={routerLinksList[index]} >
              <ListItemIcon className="drawer-list-item">
              {React.createElement(iconList[index])}
              </ListItemIcon>
              <ListItemText className="drawer-list-item" primary={text}/>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem className="drawer-list-item-button" key={"Log Out"} disablePadding>
            <ListItemButton className="drawer-list-item-button" onClick={logOut}>
              <ListItemIcon className="drawer-list-item">
              {React.createElement(iconList[4])}
              </ListItemIcon>
              <ListItemText className="drawer-list-item" primary={"Log Out"}/>
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
    </StyledEngineProvider>
  );

  return (
    <>
      <header className="base-header">
        <div className="header-icon"> <img className="header-icon-feather" src='/assets/icons/BirdIconO.ico' alt="featherIcon" /> </div>
        <p className="header-title">
          Feather Feed
        </p>
        <div className="header-icon header-icon-menu"> {isOpen? <img src='/assets/icons/close_orange.svg' alt="close menu" ref={iconRef} onClick={toggleMenu}/> : <img src='/assets/icons/menu_orange.svg' alt="menu" onClick={toggleMenu}  />} </div>
      </header>
      <SwipeableDrawer
      anchor={"right"}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      {DrawerList}
    </SwipeableDrawer>
    </>
  );
}



// EXPORT VARIABLES
export default Header;