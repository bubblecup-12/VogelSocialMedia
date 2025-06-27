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
import ButtonRotkehlchen from "../ButtonRotkehlchen";
import Username from "./Username";
import "./username.css";
import api from "../../api/axios";
import { ChangeEvent, useState } from "react";
import { UserProfile } from "../../types/UserProfile";

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
  setUserData,
  imageUrl,
}: {
  ownAccount: boolean;
  username: string;
  setUserData: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  imageUrl?: string | null;
}) {
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const saveProfilePicture = async () => {
    try {
      const formData = new FormData();
      console.log("Saving profile picture:", file);
      if (file) {
        formData.append("image", file);
        const response = await api.post(
          "/profile/uploadProfilePicture",
          formData
        );
        console.log("Profile picture saved:", response.data);
        setUserData((prevData) => (prevData ?{
          ...prevData, 
          profilePictureUrl: response.data.url
        } : null));
      }
      setOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error("Error saving profile picture:", error);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="user">
        <Button onClick={handleClickOpen}>
          <Avatar
            className="profile-avatar"
            alt="Username"
            src={imageUrl ? imageUrl : undefined}
          >
            {username && username[0].toUpperCase() || ""}
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
                marginBottom: "1rem",
              }}
            >
              <img
                alt={file ? file.name : "Profile Picture"}
                src={file ? URL.createObjectURL(file) : imageUrl || ""}
                style={{
                  maxWidth: "30rem",
                  maxHeight: "30rem",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              ></img>
            </Box>
            {ownAccount && (
              <div className="change-avatar-button">
                <label htmlFor="profile-picture">
                    <EditSquareIcon className="edit-icon" />
                    <input
                      type="file"
                      id="profile-picture"
                      name="profile-picture"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                </label>
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
