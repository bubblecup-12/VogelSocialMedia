import "./profile.css";
import "../components/bio.css";
import "./loginAndSignUpPage.css";
import "../styles/sizes.css";
import "../styles/colors.css";
import "../styles/fonts.css";
import { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import QuiltedImageList from "../components/QuiltedImageList";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  StyledEngineProvider,
  createTheme,
  ThemeProvider,
  Divider,
  Button,
  Tooltip,
  Popover,
  Typography,
} from "@mui/material";
import ProfilePictureDialog from "../components/ChagneAvatarDialog";

function Profile() {
  const toggleEditMode = (event: React.MouseEvent<HTMLElement>) => {
    isEditable(!editMode);
  };
  const [editMode, isEditable] = useState(true);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 650,
        lg: 768,
        xl: 1200,
      },
    },
  });
  const matchDownMd = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const username = "Username12345678"; /* Get username from database */

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="profile-display">
          <div className="user-info">
            <div className="user">
              <ProfilePictureDialog />
              <Popover
                className="profile-popover"
                onClose={handleClose}
                id={id}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography sx={{p: 1}}>{username}</Typography>
              </Popover>
              <span className="profile-username body-l" onClick={handleClick}>
                {username}
              </span>
            </div>
            <div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    width: "30ch",
                    maxWidth: "100%",
                  },
                }}
                noValidate
                autoComplete="off"
                onClick={editMode ? toggleEditMode : undefined}
              >
                <TextField
                  className="bio-input"
                  id="outlined-multiline-flexible"
                  label="✎ Bio"
                  multiline
                  maxRows={4}
                  disabled={editMode}
                />
              </Box>
              {!editMode && (
                <Button
                  variant="contained"
                  className="button"
                  onClick={toggleEditMode}
                >
                  Ok
                </Button>
              )}
            </div>
            <Divider variant="middle" className="divider" />
            <div className="numeral-data">
              <div className="data">
                <span aria-label="current-post-number">50</span>
                <span className="data-label title-h1">Posts</span>
              </div>
              <div className="data">
                <span aria-label="current-follower-number">100</span>
                <span className="data-label title-h1">Followers</span>
              </div>
              <div className="data">
                <span aria-label="current-following-number">50</span>
                <span className="data-label title-h1">Following</span>
              </div>
            </div>
          </div>
          <QuiltedImageList />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default Profile;
