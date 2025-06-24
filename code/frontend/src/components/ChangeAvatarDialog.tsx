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
import "../styles/colors.css";
import "../styles/fonts.css";
import "./changeAvatarDialog.css";
import ButtonRotkehlchen from "./ButtonRotkehlchen";
import { useFilePicker } from "use-file-picker";

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
  const { openFilePicker, filesContent, loading } = useFilePicker({
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
    setImageURL({ newImage: false }); // Reset the selected image when closing
    setOpen(false);
  };
  const handleSaveChanges = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <Avatar
          alt="Username"
          // current code does not work yet
          // TODO: If no image is selected, return the image already in the database or undefined
          src={
            filesContent.length > 0
              ? setImageURL({ newImage: true })
              : undefined
          }
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
        <DialogTitle
          className="small-title orange-text"
          sx={{ m: 1.5, p: 2 }}
          id="change-profile-picture-dialog"
        > { ownAccount ?
          "Change Profile Picture" :
          username
        }
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
                onClick={handleSaveChanges}
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
    </React.Fragment>
  );
}
