import "./header.css";
import React, { useState, useRef } from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, StyledEngineProvider, SwipeableDrawer, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import { Link } from "react-router-dom";
import { useAuth } from "../api/Auth";
import { ExitToApp } from "@mui/icons-material";

// TODO: Dinge so umstrukturieren, dass der State für das offene menü in Header ist und das Menü auch in Header, sodass es mit width 100% die volle breite einnehmen kann

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const { logout, user } = useAuth();
  const iconList = [DynamicFeedIcon, AddAPhotoIcon, PersonIcon, InfoIcon, LogoutIcon, ExitToAppIcon, FollowTheSignsIcon];
  const routerLinksList = ["/feed","/createpost","/profile","/about","/login","/register"]

  // TODO: Logout nur anzeigen wenn user eingeloggt ist

  const DrawerList = (
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
        {user && <ListItem className="drawer-list-item-button" key={"Log Out"} disablePadding>
            <ListItemButton className="drawer-list-item-button" onClick={logout}>
              <ListItemIcon className="drawer-list-item">
              {React.createElement(iconList[4])}
              </ListItemIcon>
              <ListItemText className="drawer-list-item" primary={"Log Out"}/>
            </ListItemButton>
        </ListItem> }
        {!user && <> <ListItem className="drawer-list-item-button" key={"Login"} disablePadding>
            <ListItemButton className="drawer-list-item-button" component={Link} to={routerLinksList[4]}>
              <ListItemIcon className="drawer-list-item">
              {React.createElement(iconList[5])}
              </ListItemIcon>
              <ListItemText className="drawer-list-item" primary={"Login"}/>
            </ListItemButton>
        </ListItem>
        <ListItem className="drawer-list-item-button" key={"Sign up"} disablePadding>
            <ListItemButton className="drawer-list-item-button" component={Link} to={routerLinksList[5]}>
              <ListItemIcon className="drawer-list-item">
              {React.createElement(iconList[6])}
              </ListItemIcon>
              <ListItemText className="drawer-list-item" primary={"Sign up"}/>
            </ListItemButton>
        </ListItem> </> }
        
      </List>
    </Box>
  );

  return (
    <>
      <header className="base-header blue-background">
        <div className="header-icon"> <img className="header-icon-feather" src='/assets/icons/BirdIconO.ico' alt="featherIcon" /> </div>
        <p className="header-title small-title">
          Feather Feed
        </p>
        <div className="header-icon header-icon-menu"> <img src='/assets/icons/menu_orange.svg' alt="menu" onClick={toggleMenu}  /> </div>
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