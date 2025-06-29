import ImageListItem from "@mui/material/ImageListItem";
import { StyledEngineProvider } from "@mui/material/styles";
import "./quiltedImageList.css";
import { Box, Grid } from "@mui/material";
import api from "../api/axios";
import { useEffect, useState } from "react";
import { UserProfile } from "../types/UserProfile";
import { useNavigate } from "react-router-dom";

export default function StandardImageList({ user }: { user: UserProfile }) {
  const navigate = useNavigate();
  const [images, setImages] = useState<
    { imageUrl: string; id: string; description: string }[]
  >([]);

  useEffect(() => {
    fetchUserPosts().then(console.log);
  },[user])

  const fetchUserPosts = async () => {
    try {
      if (images.length <= 0) {
        console.log("Fetching user posts for:", user.username);
        const response = await api.get(`/posts/getUserPosts/${user.username}`);
        const posts = response.data.posts;
        posts.map(async (post: { id: string; description: string }) => {
          try {
            await api
              .get(`/posts/getPost/{postId}?postId=${post.id}`)
              .then((response) => {
                if (response.data) {
                  setImages((prevImages) => [
                    ...prevImages,
                    {
                      imageUrl: response.data.images[0].url,
                      id: post.id,
                      description: post.description || "",
                    },
                  ]);
                }
              })
              .catch((error) => {
                console.error("Error fetching post image:", error);
              });
          } catch (error) {
            console.error("Error processing post:", error);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <Box className="box">
        <Grid container spacing={1} className="image-list">
          {images.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={item.imageUrl}
                alt={item.description}
                onClick={
                  () => navigate("/feed", { replace: true })
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
