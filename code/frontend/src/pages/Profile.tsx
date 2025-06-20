import "./profile.css";
import "../components/bio.css";
import "./loginAndSignUpPage.css";
import "../styles/sizes.css";
import "../styles/colors.css";
import "../styles/fonts.css";
import { useState } from "react";
import QuiltedImageList from "../components/QuiltedImageList";
import {
  Box,
  StyledEngineProvider,
  Divider,
  Button,
  Popover,
  Typography,
  TextField
} from "@mui/material";
import ChangeAvatarDialog from "../components/ChagneAvatarDialog";

function Profile() {
  const toggleEditMode = () => {
    isEditable(!editMode);
  };
  const [editMode, isEditable] = useState(true);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);
  const id = isPopoverOpen ? "simple-popover" : undefined;

  const username = "Username12345678"; /* Get username from database */

  return (
    <StyledEngineProvider injectFirst>
      <div className="profile-display">
        <div className="user-info">
          <div className="user">
            <ChangeAvatarDialog />
            <Popover
              className="profile-popover"
              onClose={closePopover}
              id={id}
              open={isPopoverOpen}
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
              <Typography sx={{ p: 1 }}>{username}</Typography>
            </Popover>
            <span className="profile-username body-l" onClick={openPopover}>
              {username}
            </span>
          </div>
          <div
          >
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
                defaultValue="This is a sample bio. Click to edit."
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
    </StyledEngineProvider>
  );
}

export default Profile;
