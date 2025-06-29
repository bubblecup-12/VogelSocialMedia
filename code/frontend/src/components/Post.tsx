import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import api from "../api/axios";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
interface PostProps {
  postId: string;
}
interface PostResponse {
  description: string;
  status: string;
  likes: number;
  tags: string[];
  user: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  images: {
    originalName: string;
    mimetype: string;
    url: string;
  }[];
  following: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})<ExpandMoreProps>(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
}));

export default function Post({ postId }: PostProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [post, setPost] = React.useState<PostResponse | null>(null);

  React.useEffect(() => {
    getPostbyID();
    // eslint-disable-next-line
  }, [postId]);

  async function getPostbyID(): Promise<void> {
    try {
      const response = await api.get<PostResponse>(`/posts/getPost/{postId}?postId=${postId}`);
      //const response = await api.get<PostResponse>(`http://localhost:3001/api/posts/getPost/{postId}?postId=${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  }

  if (!post) {
    return (
      <Card sx={{ maxWidth: 365, margin: 2, width:'100%'}}>
        <CardContent>
          <Typography>Loading...</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
            {post.user.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.user.name}
        subheader={new Date(post.createdAt).toLocaleString()}
      />
      {post.images && post.images.length > 0 && (
        <CardMedia
          component="img"
          height="194"
          image={post.images[0].url}
          alt={post.images[0].originalName}
        />
      )}
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {post.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Status: {post.status}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Likes: {post.likes}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Tags: {post.tags.join(", ")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Following: {post.following ? "Ja" : "Nein"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
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
          <Typography variant="body2" color="text.secondary">
            Erstellt am: {new Date(post.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Zuletzt aktualisiert: {new Date(post.updatedAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
