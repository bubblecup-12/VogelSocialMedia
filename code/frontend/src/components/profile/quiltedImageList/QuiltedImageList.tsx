import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Skeleton, StyledEngineProvider } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import api from "../../../api/axios";
import { UserProfile } from "../../../types/UserProfile";
import "./quiltedImageList.css";

type Post = {
  id: string;
  description: string;
  createdAt: string;
};

type PostImagesResponse = {
  images: { url: string }[];
};

export default function StandardImageList({ user }: { user: UserProfile }) {
  const navigate = useNavigate();
  const [images, setImages] = useState<
    { imageUrl: string; id: string; description: string; createdAt: string }[]
  >([]);

  useEffect(() => {
    if (user.username != undefined) {
      fetchUserPosts().then(console.log);
      return;
    }
  }, [user.username]);

  const fetchUserPosts = async () => {
    try {
      const response = await api.get<{ posts: Post[] }>(
        `/posts/getUserPosts/${user.username}`
      );
      const posts = response.data.posts;
      const fetchedImages = await Promise.all(
        posts.map(
          async (post: Post) => {
            try {
              const response = await api.get<PostImagesResponse>(
                `/posts/getPost/{postId}?postId=${post.id}`
              );
              if (response.data && response.data.images.length > 0) {
                console.log(response.data);
                return {
                  imageUrl: response.data.images[0].url,
                  id: post.id,
                  description: post.description || "",
                  createdAt: post.createdAt,
                };
              }
            } catch (error) {
              console.error("Error fetching post images:", error);
            }
          }
        )
      );
      console.log("Fetched images:", fetchedImages);
      setImages(
        fetchedImages.filter(
          (image): image is { imageUrl: string; id: string; description: string; createdAt: string } =>
            image !== undefined
        )
      );
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <Box className="box">
        <Grid container spacing={1} className="image-list">
          {images.map((item, index) => {
            return (
              <ImageListItem key={index}>
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.description}
                    onClick={() => navigate(`/feed/${user.username}#${item.id}`)}
                    loading="lazy"
                  />
                ) : (
                  <Skeleton variant="rectangular" width={210} height={118} />
                )}
              </ImageListItem>
            );
          })}
        </Grid>
      </Box>
    </StyledEngineProvider>
  );
}
