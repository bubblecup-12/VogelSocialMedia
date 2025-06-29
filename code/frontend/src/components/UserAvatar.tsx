import { Avatar, Box, Typography } from "@mui/material";
import api from "../api/axios";
import { useState,useEffect } from "react";

interface UserAvatarProps {
  username: string|null;
  src?: string;
  size?: number | string;
}

export default function UserAvatar({ username, size = 40 }: UserAvatarProps) {
    const[pb, setPb] = useState<string>();

    useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/profile/getProfilePicture/${username}`)
            setPb(res.data.url);
        } catch (error) {
            console.log(error);
      }
    })();
  }, [username]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Avatar
        src={pb}
        sx={{
          width: size,
          height: size,
          bgcolor: pb ? "transparent" : "primary.main",
          fontWeight: 500,
        }}
      >
        username[0];
      </Avatar>
      <Typography
        component="span"
        fontWeight={500}
        sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}
      >
        {username}
      </Typography>
    </Box>
  );
}

// ---------------- Exemplarische Verwendung ----------------
// <UserAvatar username={user?.username ?? "Unknown User"} src={user?.avatarUrl} />
// ---------------------------------------------------------
