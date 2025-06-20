import Header from "./header";
import "./postCreation.css";
import "./loginAndSignUpPage.css";
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';

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

  const initialOptions = startTags.map((option) => option.title);


  const [options, setOptions] = useState(initialOptions);
  const [tags, setTags] = useState<string[]>([initialOptions[1]]);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const [data, setData] = useState<ImageItem[]>([]);

  const handleChange = (event: any, newValue: string[]) => {
    // Add new entries to options if they don't already exist
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
      const newItems: ImageItem[] = Array.from(files).map((file) => ({
        src: URL.createObjectURL(file),
        title: file.name,
        description: 'Uploaded image',
      }));

      setData((prev) => [...prev, ...newItems]);
    }
  };

    return(
    <div className="create-display">
        <Header/>
        <div className="create-part">
          <form>
            <h1>Create Post</h1>
            <div className="create-account">
              <img src="assets/icons/account_circle.svg" alt="Profil picture"></img>
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
                  gap:1,
                  py: 1,
                  overflow: 'auto',
                  width: '50vw',
                  scrollSnapType: 'x mandatory',
                  '& > *': {
                    scrollSnapAlign: 'center',
                  },
                  '::-webkit-scrollbar': { display: 'none' },
                }}
              >
              <Card orientation="horizontal" size="sm" key="add" variant="outlined" onClick={()=>{

              }}>
                <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
                  <label className="createa-file-upload">
                    <img src="/assets/icons/add-plus.svg" />
                    <input id="create-file-upload" type="file" accept="image/*" multiple={true} onChange={handleImageUpload}/>
                  </label>
                  
                </AspectRatio>
              </Card>
              {data.map((item) => (
                <Card orientation="horizontal" size="sm" key={item.title} variant="outlined" onClick={()=> {
                  setSelectedImage(item.src);
                }}>
                  <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
                    <img
                      srcSet={item.src}
                      src={item.src}
                      alt={item.title}
                    />
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
                    variant="filled"
                    label="Tags"
                    placeholder="Tag"
                  />
                  )}
                />            
            </div>
            <input type="submit" value={"Post"} className="login-button"></input>
          </form>
        </div>
    </div>);
}
export default PostCreation;