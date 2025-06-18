import "./profile.css";
import "./bio.css";
import "./loginAndSignUpPage.css";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import QuiltedImageList from "./QuiltedImageList";
import { deepOrange } from "@mui/material/colors";
import Hashtags from "./Hashtags";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  IconButton,
  StyledEngineProvider,
  createTheme,
  ThemeProvider,
  Divider,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/EditSquare";

function Profile() {
  const toggleEditMode = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    isEditable(!editMode);
  };
  const [editMode, isEditable] = useState(false);
  const [text, setText] = useState("");

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
              <Avatar
                alt="Username"
                src="./assets/images/OwlSignUp.png"
                className="profile-avatar"
              >
                U
              </Avatar>
              <span className="profile-username body-m">Username</span>
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
              >
                <TextField
                  className="bio-input"
                  id="outlined-multiline-flexible"
                  label="✎ Bio"
                  multiline
                  maxRows={4}
                  disabled={editMode}
                  onDoubleClick={toggleEditMode}
                />
              </Box>
              {!editMode && <Button variant="contained" className="button" onClick={toggleEditMode}>Ok</Button>}
            </div>
            <Divider variant="middle" className="divider"/>
            <div className="numeral-data">
              <div className="data">
                <span aria-label="current-post-number">50</span>
                <span className="data-label">Posts</span>
              </div>
              <div className="data">
                <span aria-label="current-follower-number">100</span>
                <span className="data-label">Followers</span>
              </div>
              <div className="data">
                <span aria-label="current-following-number">50</span>
                <span className="data-label">Following</span>
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
