import * as React from "react";
import { styled, StyledEngineProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import api from "../../api/axios";
import { Url } from "url";
import "./post.css";
import UserAvatar from "../UserAvatar";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useCallback } from "react";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
interface PostProps {
  postId: string;
  autoScroll?: boolean;
}
interface PostResponse {
  description: string;
  status: string;
  likes: number;
  tags: string[];
  user: {
    id: string;
    name: string;
    profilePicture: Url;
  };
  createdAt: string;
  updatedAt: string;
  images: {
    originalName: string;
    mimetype: string;
    url: string;
  }[];
  following: boolean;
  hasLiked: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})<ExpandMoreProps>(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

export default function Post({ postId, autoScroll }: PostProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [post, setPost] = React.useState<PostResponse | null>(null);
  const [currentImage, setCurrentImage] = React.useState(0);
  const [like, setLike] = React.useState(false);
  const navigate = useNavigate();
  const postRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutsRef = useRef<number[]>([]);

  // Using useCallback to memoize the function and avoid dependency issues
  const getPostbyID = useCallback(async (): Promise<void> => {
    try {
      const response = await api.get<PostResponse>(
        `/posts/getPost/{postId}?postId=${postId}`
      );
      setPost(response.data);
      setLike(response.data.hasLiked);
      setCurrentImage(0);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  }, [postId]);

  // Auto-scroll effect with cleanup for timeouts
  useEffect(() => {
    if (autoScroll && post) {
      console.log("Preparing to scroll to post:", postId);

      // Clear any existing timeouts first
      scrollTimeoutsRef.current.forEach(clearTimeout);
      scrollTimeoutsRef.current = [];

      // Using forEach instead of map since we don't need to return values
      [50, 100, 300, 500, 1000, 1500].forEach((delay) => {
        const timeoutId = window.setTimeout(() => {
          if (postRef.current) {
            console.log(`Scrolling attempt at ${delay}ms`);
            postRef.current.scrollIntoView({
              behavior: "auto",
              block: "start",
            });
          }
        }, delay);
        scrollTimeoutsRef.current.push(timeoutId);
      });
    }

    // Clean up timeouts when component unmounts or dependencies change
    return () => {
      scrollTimeoutsRef.current.forEach(clearTimeout);
      scrollTimeoutsRef.current = [];
    };
  }, [autoScroll, post, postId]);

  // Fetch post data when postId changes
  useEffect(() => {
    getPostbyID();
  }, [getPostbyID]); // Now getPostbyID is a dependency

  if (!post) {
    return (
      <Card sx={{ maxWidth: 400, width: "100%", margin: 2 }}>
        <CardContent>
          <Typography>Loading...</Typography>
        </CardContent>
      </Card>
    );
  }

  const images = post.images || [];
  const hasMultipleImages = images.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleLike = async () => {
    try {
      if (!like) {
        await api.post(`/posts/like/${postId}`);
        setLike(true);
        setPost((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : prev));
      } else {
        await api.delete(`/posts/removeLike/${postId}`);
        setLike(false);
        setPost((prev) => (prev ? { ...prev, likes: prev.likes - 1 } : prev));
      }
    } catch (error) {
      console.error("Failed to update like:", error);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <Card
        ref={postRef}
        className="body-l"
        sx={{ maxWidth: 600, width: "100%", margin: 2 }}
      >
        <CardHeader
          avatar={
            <UserAvatar
              username={post.user.name}
              size={60}
              onClick={() => navigate(`/profile/${post.user.name}`)}
            />
          }
        />
        {images.length > 0 && (
          <div className="post-image-carousel">
            <CardMedia
              component="img"
              image={images[currentImage].url}
              alt={images[currentImage].originalName}
              className="post-image"
            />
            {hasMultipleImages && (
              <>
                <IconButton
                  aria-label="previous image"
                  onClick={handlePrev}
                  className="post-carousel-arrow left"
                  size="small"
                >
                  {"<"}
                </IconButton>
                <IconButton
                  aria-label="next image"
                  onClick={handleNext}
                  className="post-carousel-arrow right"
                  size="small"
                >
                  {">"}
                </IconButton>
                <div className="post-image-counter">
                  {currentImage + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        )}
        <CardContent>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {post.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="like" onClick={handleLike}>
            <FavoriteIcon
              className="post-like-icon"
              sx={{
                color: like ? "#d32f2f" : "#fff",
                stroke: !like ? "grey" : "none",
                strokeWidth: !like ? 2 : 0,
              }}
            />
            <span className="post-like-count">{post.likes}</span>
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {post.tags && post.tags.length > 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Tags: {post.tags.join(", ")}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              Created at: {new Date(post.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last updated: {new Date(post.updatedAt).toLocaleString()}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </StyledEngineProvider>
  );
}
