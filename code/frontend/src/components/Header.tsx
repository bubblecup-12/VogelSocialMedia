import "./header.css";
import React, { useState, useRef } from "react";
import { createTheme, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const iconRef = useRef<HTMLImageElement>(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const iconList = [DynamicFeedIcon, AddAPhotoIcon, PersonIcon, InfoIcon, LogoutIcon];
  const routerLinksList = ["/feed","/app","/app","/app","/app"]

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
        {["Feed", "Create Post", "Profile", "About Us", "Log Out"].map((text, index) => (
          <ListItem sx={{height: '10vh'}} key={text} disablePadding>
            <ListItemButton sx={{height: '10vh'}} /*component={RouterLink} to={routerLinksList[index]}*/>
              <ListItemIcon>
              {React.createElement(iconList[index])}
              </ListItemIcon>
              <ListItemText primary={text} slotProps={{primary: {color: 'primary'}}}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </ThemeProvider>
    </Box>
  );

  return (
    <div className="outest-container" >
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
    </div>
  );
}



// EXPORT VARIABLES
export default Header;