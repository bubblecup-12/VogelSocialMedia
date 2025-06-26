import Header from "./header";
import "./postCreation.css";
import "./loginAndSignUpPage.css";
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Close from '@mui/icons-material/Close';

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';

function PostCreation(){
  const startTags = [
    { title: 'Bird' },
    { title: 'Birds'},
    { title: 'Feather'},
    { title: 'Bird Feather'},
    { title: 'Feathers'},
    { title: 'Featherfeed'}
  ];

  interface ImageItem {
    src: string;
    title: string;
    description: string;
  }
  
  const theme = createTheme({
    palette: {
    primary: {
      main: '#EAC22A'
    },
    secondary: {
      main: '#4C4141'
    },
  },
});

  const initialOptions = startTags.map((option) => option.title);

  const [options, setOptions] = useState(initialOptions);
  const [tags, setTags] = useState<string[]>([initialOptions[1]]);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const [data, setData] = useState<ImageItem[]>([]);

  const handleChange = (event: any, newValue: string[]) => {
    newValue.forEach((val) => {
      if (!options.includes(val)) {
        setOptions((prev) => [...prev, val]);
      }
    });
    setTags(newValue);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const newItems: ImageItem[] = Array.from(files).map((file) => ({
        src: URL.createObjectURL(file),
        title: file.name,
        description: 'Uploaded image',
      }
    ));
      const lastImageUrl = newItems[newItems.length - 1].src;

      setData((prev) => [...prev, ...newItems]);
      setSelectedImage(lastImageUrl);
    }
  };
  const handleDelete = (idx: number) =>
    setData((prev) => prev.filter((_, i) => i !== idx));

    return(
    <ThemeProvider theme={theme}>
    <div className="create-display">
        <Header/>
        <div className="create-part">
          <form>
            <h1>Create Post</h1>
            <div className="create-account">
              <Avatar alt="Remy Sharp" src="/assets/images/BirdLogin.jpg" />
              <span className="create-username">Username</span>
            </div>
            <div className="create-post1">
              <img src={selectedImage} className="create-post-image" alt="Image"></img>
              <textarea className="create-post-description"></textarea>
            </div>
            <div className="create-post2">
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  py: 1,
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  width: '100%',
                  maxWidth: {xs:'90vw', sm:'600px'},
                  mx: 'auto',                      // center the box
                  scrollSnapType: 'x mandatory',
                  '& > *': { scrollSnapAlign: 'center' },
                  '::-webkit-scrollbar': { display: 'none', flexShrink: '0' },
                }}
              >
                {/* Upload card */}
                <Card orientation="horizontal" size="sm" key="add" variant="outlined">
                  <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
                    <label className="createa-file-upload">
                      <img src="/assets/icons/add-plus.svg" alt="Upload" />
                      <input
                        id="create-file-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                      />
                    </label>
                  </AspectRatio>
                </Card>

                {/* Image cards */}
                {data.map((item, idx) => (
                  <Card
                    orientation="horizontal"
                    size="sm"
                    key={`${item.title}-${idx}`}
                    variant="outlined"
                    sx={{ position: 'relative' }}
                    onClick={() => setSelectedImage(item.src)}
                  >
                    {/* delete pill */}
                    <IconButton
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();          // keep the main onClick from firing
                        handleDelete(idx);
                      }}
                      sx={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        bgcolor: 'background.body',
                        zIndex: 1,
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>

                    <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
                      <img src={item.src} alt={item.title} />
                    </AspectRatio>
                  </Card>
                ))}
              </Box>
              <Autocomplete
                className="create-tags"
                multiple
                id="tags-filled"
                options={options}
                defaultValue={[startTags[1].title]}
                freeSolo
                value={tags}
                onChange={handleChange}
                sx={{ width: "90vw" }}
                renderValue={(value: readonly string[], getItemProps) =>
                value.map((option: string, index: number) => {
                  const { key, ...itemProps } = getItemProps({ index });
                  return (
                  <Chip variant="outlined" label={option} key={key} {...itemProps} />
                  );
                })
                }
                renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  color='primary'
                  label="Tags"
                  placeholder="Add Tags"
                />
                )}
              />            
            </div>
            <div className="create-post3">
              <input type="submit" value={"Post"} className="login-button"></input>
            </div>
          </form>
        </div>
    </div>
    </ThemeProvider>);
}
export default PostCreation;