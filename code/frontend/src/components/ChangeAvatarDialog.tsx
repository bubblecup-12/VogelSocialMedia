import * as React from "react";
import { useRef, useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import "../styles/colors.css";
import "../styles/fonts.css";
import "./changeAvatarDialog.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  
  const inputFile = useRef<HTMLInputElement | null>(null);
  
  const openFileExplorer = () => {
    // `current` points to the mounted file input element
    if (inputFile.current) {
      inputFile.current.click();
    }
  };
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const setImageURL = (selectedImage: File | null) => {
    if (selectedImage !== null) {
      return URL.createObjectURL(selectedImage);
    }
    //TODO: If no image is selected, return the image already in the database or undefined
    return undefined;
  }
  
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedImage(null); // Reset the selected image when closing
    setOpen(false);
  };
  const handleSaveChanges = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <Avatar
          alt="Username"
          src={setImageURL(selectedImage)}
          className="profile-avatar"
        >
          U
        </Avatar>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="change-profile-picture-dialog"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="change-profile-picture-dialog">
          Change Profile Picture
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
        <DialogContent dividers>
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
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Profile Picture"
                style={{maxWidth: "30rem", maxHeight: "30rem" , width: "100%", height: "100%", objectFit: "cover"}}
              />
            )}
          </Box>
          <IconButton aria-label="upload picture" onClick={openFileExplorer}>
            <EditSquareIcon />
            <input
              type="file"
              id="file"
              onChange={(event) => {
                console.log(event.target.files ? [0] : undefined); // Log the selected file
                if (event.target.files && event.target.files[0]) {
                  setSelectedImage(event.target.files[0]); // Update the state with the selected file
                }
              }}
            />
          </IconButton>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSaveChanges}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
