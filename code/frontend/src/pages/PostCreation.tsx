import "./postCreation.css";
import "./loginAndSignUpPage.css";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ButtonPrimary from "../components/buttons/buttonRotkehlchen/ButtonRotkehlchen";

import api from "../api/axios";
import { useAuth } from "../api/Auth";
import {Box,Card,CardMedia,CardActionArea,IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main:'#e79a0e;'
    }
  }
});

function PostCreation(){
  const {user} = useAuth();
  interface ImageItem {
    src: string;
    title: string;
  }
  const [options, setOptions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>();

  const [data, setData] = useState<ImageItem[]>([]);
  const navigate = useNavigate();

  const [fileList,setFileList] = useState<FileList|null>(null);
  const inputFile = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get<string[]>("/posts/tags"); // GET /api/posts/tags
        if (!cancelled) setOptions(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleTags = (event: any, newValue: string[]) => {
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
      }
    ));
      const lastImageUrl = newItems[newItems.length - 1].src;

      setData((prev) => [...prev, ...newItems]);
      setSelectedImage(lastImageUrl);
    }
    setFileList(files);
  };
  const onEmptyImgClick = () =>{
    if(inputFile.current){
      inputFile.current?.click();
    }
  }
  const handleDelete = (idx: number) =>{
    setData((prev) => prev.filter((_, i) => i !== idx));
    if((idx-1)<0){
      if(data.length == 1){setSelectedImage("");}
      else{setSelectedImage(data[idx+1].src);}
    }
    else {setSelectedImage(data[idx-1].src);}
  }

  const onSubmit = async(event: React.FormEvent) =>{
    event.preventDefault();
    if (!fileList) {
      return;
    }
    const fData = new FormData();
    files.forEach((file, i) => {
      fData.append(`images`, file, file.name);
    });
    fData.append('status','PUBLIC');
    fData.append('description', description);
    tags.forEach((tag) => {
      fData.append("tags" ,tag);
    })

    try {
      await api.post("/posts/upload", fData)
      navigate(`/profile/${user?.username}`)
    } catch (error:any) {
      console.log(error);
    }
  };
  const onCancel= () => {
    navigate(`/profile/${user?.username}`)
  };

  const files = fileList ? [...fileList] : [];

    return(
      <ThemeProvider theme={theme}>
    <div className="create-display">
        <div className="create-part">
          <form onSubmit={onSubmit}>
            <h1>Create Post</h1>
            <div className="create-layout">
              <div className="create-preview">
            {selectedImage? 
            <img src={selectedImage} className="create-post-image" alt="Add an Image"></img>: 
            <label className="create-post-img-layer" onClick={onEmptyImgClick}>
              <strong>Add Picture</strong>
            </label>}
            </div>
            <div className="create-post-desc">
              <h2>Description</h2>
              <textarea className="create-post-description" value={description} onChange={handleChange} required></textarea>
              </div>
              <Box
              className="strip"
                sx={{
                  display: 'flex',
                  gap: 1,
                  py: 1,
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  width: '100%',
                  maxWidth: { xs: '90vw', sm: '600px' },
                  mx: 'auto',
                  scrollSnapType: 'x mandatory',
                  '& > *': { scrollSnapAlign: 'center' },
                  '::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {/* Upload card */}
                <Card
                  key="add"
                  variant="outlined"
                  sx={{
                    minWidth: 60,
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <label style={{ cursor: 'pointer', width: '100%', height: '100%' }}>
                    <img src="/assets/icons/add-plus.svg" alt="Upload" style={{ width: '100%', height: '100%' }}/>
                    <input
                      id="create-file-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      ref={inputFile}
                    />
                  </label>
                </Card>

                {/* Image cards */}
                {data.map((item, idx) => (
                  <Card
                    key={`${item.title}-${idx}`}
                    variant="outlined"
                    sx={{
                      position: 'relative',
                      minWidth: 60,
                      width: 60,
                      height: 60,
                      flexShrink: 0,
                    }}
                    onClick={() => setSelectedImage(item.src)}
                  >
                    {/* Delete button */}
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(idx);
                      }}
                      sx={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        backgroundColor: 'background.paper',
                        zIndex: 1,
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>

                    <CardActionArea sx={{ width: '100%', height: '100%' }}>
                      <CardMedia
                        component="img"
                        image={item.src}
                        alt={item.title}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </CardActionArea>
                  </Card>
                ))}
              </Box>

              <Autocomplete
                className="create-tags"
                multiple
                id="tags-filled"
                options={options}
                freeSolo
                value={tags}
                onChange={handleTags}
                sx={{ width: "100%" }}
                renderValue={(value: readonly string[], getItemProps) =>
                value.map((tags: string, index: number) => {
                  const { key, ...itemProps } = getItemProps({ index });
                  return (
                  <Chip variant="outlined" label={tags} key={key} {...itemProps} />
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
              <div className="create-buttons">
              <ButtonPrimary style="secondary" label="Cancel" type="button" onClick={onCancel} ></ButtonPrimary>
              <ButtonPrimary style="primary" label="Post" type="submit" ></ButtonPrimary>
              </div>
              </div>          
          </form>
        </div>
    </div>
    </ThemeProvider>
    );
}
export default PostCreation;