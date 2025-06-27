import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import StyledEngineProvider from "@mui/styled-engine/StyledEngineProvider";
import { useState } from "react";
import "./bio.css";
import "../styles/colors.css";
import IconButton from "@mui/material/IconButton";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import ButtonPrimary from "../ButtonRotkehlchen";
import api from "../../api/axios";

export default function BioTextField({ ownAccount, bioText, setBio } : { ownAccount: boolean, bioText: string | undefined, setBio: (bio: string) => void }) {
  const [oldBio, setOldbio] = useState<string>(bioText || "");
  const [editMode, setEditable] = useState(false);

  const toggleEditMode = () => {
    !editMode && setOldbio(bioText || "");
    ownAccount && setEditable(!editMode);
  };

  const cancleBio = () => {
    setBio(oldBio);
    setEditable(false);
  };

  const saveBio = async () => {
    try {
      await api.put("/profile/updateBio", {
        bio: bioText,
      });
      setEditable(false);
    } catch (error) {
      console.error("Error saving bio: ", error);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value);
  }

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
            value={bioText}
            onChange={handleChange}
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
              type="button"
              onClick={saveBio}
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
