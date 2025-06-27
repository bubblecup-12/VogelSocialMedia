import * as React from "react";
import {
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import "./changeAvatarDialog.css";
import ButtonRotkehlchen from "./ButtonRotkehlchen";
import { useFilePicker } from "use-file-picker";
import Username from "./Username";
import "./username.css";
import api from "../api/axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AvatarDialog({
  ownAccount,
  username,
}: {
  ownAccount: boolean;
  username: string;
}) {
  const [profilePicture, setProfilePicture] = React.useState<string | null>(
    null
  );

  const saveProfilePicture = async () => {
    try {
      const response = await api.post("/profile/updateProfilePicture", {
        profilePicture: profilePicture,
      });
      setProfilePicture(response.data.data.profilePicture);
      console.log(
        "Profile picture saved successfully:",
        response.data.data.profilePicture
      );
      setOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error("Error saving profile picture:", error);
    }
  };

  const { openFilePicker, filesContent, loading, clear } = useFilePicker({
    accept: ".png, .jpg, .jpeg",
    multiple: false,
    readAs: "DataURL",
    limitFilesConfig: { max: 1 },
  });

  const setImageURL = ({ newImage = false }: { newImage: boolean }) => {
    if (newImage) {
      return filesContent[0].content;
    }
    // TODO: If no image is selected, return the image already in the database or undefined
    return undefined;
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    clear(); // Reset the selected image when closing
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="user">
        <Button onClick={handleClickOpen}>
          <Avatar
            className="profile-avatar"
            alt="Username"
            // current code does not work yet
            // TODO: If no image is selected, return the image already in the database or undefined
            src={
              filesContent.length > 0
                ? setImageURL({ newImage: true })
                : undefined
            }
          >
            U
          </Avatar>
        </Button>
        <Username username={username} />
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="change-profile-picture-dialog"
          open={open}
        >
          <DialogTitle
            className="small-title orange-text"
            sx={{ m: 1.5, p: 2 }}
            id="change-profile-picture-dialog"
          >
            {ownAccount ? "Change Profile Picture" : username}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <Divider variant="middle" className="divider" />
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                objectFit: "cover",
                maxWidth: "30rem",
                maxHeight: "30rem",
              }}
            >
              {filesContent.map((file) => (
                <img
                  alt={file.name}
                  src={file.content}
                  style={{
                    maxWidth: "30rem",
                    maxHeight: "30rem",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                ></img>
              ))}
            </Box>
            {ownAccount && (
              <div className="change-avatar-button">
                <IconButton
                  aria-label="upload picture"
                  onClick={() => openFilePicker()}
                >
                  <EditSquareIcon className="edit-icon" />
                </IconButton>
              </div>
            )}
          </DialogContent>
          {ownAccount && (
            <div>
              <Divider variant="middle" className="divider" />
              <DialogActions>
                <ButtonRotkehlchen
                  style="primary"
                  label="Save Changes"
                  type="submit"
                  onClick={saveProfilePicture}
                />
                <ButtonRotkehlchen
                  style="secondary"
                  label="Cancel"
                  type="reset"
                  onClick={handleClose}
                />
              </DialogActions>
            </div>
          )}
        </BootstrapDialog>
      </div>
    </React.Fragment>
  );
}
