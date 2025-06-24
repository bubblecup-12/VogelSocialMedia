import "./header.css";
import React, { useState, useRef } from "react";
import { createTheme, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, ThemeProvider } from '@mui/material';
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
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setIsOpen(false)}>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: 'dark',
            primary: { main: '#FFFF' },
            background: { paper: 'rgb(5, 30, 52)' },
          },
        })}
      >
      <List sx={{height:'100vh', bgcolor: 'background.paper'}}>
        {["Feed", "Create Post", "Profile", "About Us"].map((text, index) => (
          <ListItem sx={{height: '10vh'}} key={text} disablePadding>
            <ListItemButton sx={{height: '10vh'}} component={Link} to={routerLinksList[index]} >
              <ListItemIcon>
              {React.createElement(iconList[index])}
              </ListItemIcon>
              <ListItemText primary={text} slotProps={{primary: {color: 'primary'}}}/>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem sx={{height: '10vh'}} key={"Log Out"} disablePadding>
            <ListItemButton sx={{height: '10vh'}} onClick={logOut}>
              <ListItemIcon>
              {React.createElement(iconList[4])}
              </ListItemIcon>
              <ListItemText primary={"Log Out"} slotProps={{primary: {color: 'primary'}}}/>
            </ListItemButton>
          </ListItem>
      </List>
      </ThemeProvider>
    </Box>
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