import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import StyledEngineProvider from "@mui/styled-engine/StyledEngineProvider";

export default function MultilineTextFields() {
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
            label="Multiline"
            multiline
            maxRows={4}
          />
        </div>
      </Box>
    </StyledEngineProvider>
  );
}
