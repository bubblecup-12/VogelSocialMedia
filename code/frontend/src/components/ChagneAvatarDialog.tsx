import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import { useRef, useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const inputFile = useRef<HTMLInputElement | null>(null);

  const openFileExplorer = () => {
    // `current` points to the mounted file input element
    if (inputFile.current) {
      inputFile.current.click();
    }
  };
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <Avatar
          alt="Username"
          src="./assets/images/OwlSignUp.png"
          className="profile-avatar"
        >
          U
        </Avatar>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
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
          {selectedImage && <img className="profile-image-large" src={URL.createObjectURL(selectedImage)} alt="Profile Picture" />}
          <IconButton aria-label="upload picture" onClick={openFileExplorer}>
            <EditSquareIcon />
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={(event) => {
                console.log(event.target.files?[0]:undefined); // Log the selected file
                if (event.target.files && event.target.files[0]) {
                  setSelectedImage(event.target.files[0]); // Update the state with the selected file
                }
              }}
            />
          </IconButton>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
