import ImageListItem from "@mui/material/ImageListItem";
import { StyledEngineProvider } from "@mui/material/styles";
import "./quiltedImageList.css";
import { Box, Grid } from "@mui/material";
import api from "../api/axios";
import { useState } from "react";
import { UserProfile } from "../types/UserProfile";
import { useNavigate } from "react-router-dom";

export default function StandardImageList({user} : {user: UserProfile}) {

  const navigate = useNavigate();
  const [itemData, setData] = useState<{ img: string; title: string }[]>([]);

  const fetchUserPosts = async () => {
    try {
      const response = await api.get(`/profile/posts/${user.username}`);
      const posts = response.data.data;
      const images = posts.map((post: { imageUrl: string; title: string }) => ({
        img: post.imageUrl,
        title: post.title,
      }));
      setData(images);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  fetchUserPosts().then(console.log);


  return (
    <StyledEngineProvider injectFirst>
      <Box className="box">
        <Grid container spacing={1} className="image-list">
          {itemData.map((item, index) => (
            <ImageListItem key={index}>
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                onClick={() =>
                  navigate("/feed", { replace: true })
                  // anchor to post that was clicked
                }
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </Grid>
      </Box>
    </StyledEngineProvider>
  );
}

