import { useState, useEffect } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import api from "../api/axios";

interface UserAvatarProps {
  username: string | null;
  src?: string;
  size?: number | string;
  onClick?: () => void;
}

export default function UserAvatar({
  username,
  size = 40,
  onClick,
}: UserAvatarProps) {
  const [pb, setPb] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/profile/getProfilePicture/${username}`);
        setPb((res.data as { url: string }).url);
      } catch (error: any) {
        if (error.status !== 404) {
          console.log(error);
        }
      }
    })();
  }, [username]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        maxWidth: "600px",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <Avatar
        src={pb}
        alt={username || "avatar"}
        sx={{
          width: size,
          height: size,
          bgcolor: pb ? "transparent" : "primary.main",
          fontWeight: 500,
        }}
      >
        {username ? username[0].toUpperCase() : ""}
      </Avatar>
      <Typography
        component="span"
        fontWeight={500}
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {username}
      </Typography>
    </Box>
  );
}
