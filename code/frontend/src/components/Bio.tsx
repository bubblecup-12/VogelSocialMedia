import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import StyledEngineProvider from "@mui/styled-engine/StyledEngineProvider";
import { useState } from "react";
import "./bio.css";
import "../styles/colors.css";
import IconButton from "@mui/material/IconButton";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import ButtonPrimary from "./ButtonPrimary";

export default function MultilineTextFields() {
  const toggleEditMode = () => {
    isEditable(!editMode);
  };
  const [editMode, isEditable] = useState(false);

  return (
    <StyledEngineProvider injectFirst>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            className="bio-input"
            id="outlined-multiline-flexible"
            label="Bio"
            multiline
            maxRows={4}
            disabled={!editMode}
          />
          <IconButton aria-label="edit-bio">
            <EditSquareIcon
              className="edit-icon"
              onClick={toggleEditMode}
              style={{ display: editMode ? "none" : "block" }}
            />
          </IconButton>
        </div>
        {editMode && <ButtonPrimary value={"Ok"} onClick={toggleEditMode} />}
      </Box>
    </StyledEngineProvider>
  );
}
