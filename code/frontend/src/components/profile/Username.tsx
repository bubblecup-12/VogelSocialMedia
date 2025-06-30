import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import "./username.css";

export default function Username({ username }: { username: string }) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);
  const id = isPopoverOpen ? "simple-popover" : undefined;

  return (
    <>
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
      <span className="profile-username body-bold" onClick={openPopover}>
        {username}
      </span>
    </>
  );
}
