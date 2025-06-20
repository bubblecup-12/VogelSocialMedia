import "./profile.css";
import "../components/bio.css";
import "./loginAndSignUpPage.css";
import "../styles/sizes.css";
import "../styles/colors.css";
import "../styles/fonts.css";
import { useState } from "react";
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

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="profile-display">
          <div className="user-info">
            <div className="user">
              <ProfilePictureDialog />
              <Tooltip title="Username12345678" placement="top" arrow>
                <button className="profile-username body-l">
                  Username12345678
                </button>
              </Tooltip>
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
