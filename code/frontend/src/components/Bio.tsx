import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import StyledEngineProvider from "@mui/styled-engine/StyledEngineProvider";
import { useState } from "react";
import "./bio.css";
import "../styles/colors.css";
import IconButton from "@mui/material/IconButton";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import ButtonPrimary from "./ButtonRotkehlchen";

export default function BioTextField({ ownAccount }: { ownAccount: boolean }) {
  const [bio, setBio] = useState<string>("");
  const [oldBio, setOldbio] = useState<string>("");
  const [editMode, setEditable] = useState(false);

  const toggleEditMode = () => {
    !editMode && setOldbio(bio);
    ownAccount && setEditable(!editMode);
  };

  const cancleBio = () => {
    setBio(oldBio);
    setEditable(false);
  };

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
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          {ownAccount && (
            <IconButton aria-label="edit-bio">
              <EditSquareIcon
                className="edit-icon"
                onClick={toggleEditMode}
                style={{ display: editMode ? "none" : "block" }}
              />
            </IconButton>
          )}
        </div>
        {ownAccount && editMode && (
          <div>
            <ButtonPrimary
              style="primary"
              label={"Save"}
              type="submit"
              onClick={toggleEditMode}
            />
            <ButtonPrimary
              style="secondary"
              label={"Cancel"}
              type="reset"
              onClick={cancleBio}
            />
          </div>
        )}
      </Box>
    </StyledEngineProvider>
  );
}
