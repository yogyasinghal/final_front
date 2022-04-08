import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';

const Listing = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [pincode , setPincode] = useState();

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };
  const handlePincode = (event) => {
    setPincode(event.target.value);
  };

    console.log(selectedImage);
    console.log(imageUrl);
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <>
    
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
          <Button></Button>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              List Your Property Here
            </Typography>
            <Button 
              color="inherit"
              component = {Link}
              to = "/"
              size = "medium"
            >
            Home
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <br />

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-name"
          label="Name"
          value={name}
          onChange={handleName}
        />
        <TextField
          id="outlined-uncontrolled"
          label="Price"
          value={price}
          onChange={handlePrice}
        />
        <TextField
          id="outlined-code"
          label="Pincode"
          value={pincode}
          onChange={handlePincode}
        />
      </Box>

        <br/>

      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: "none" }}
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
      <label htmlFor="select-image">
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>
      {imageUrl && selectedImage && (
        <Box mt={2} textAlign="center">
          <div>Image Preview:</div>
          <img src={imageUrl} alt={selectedImage.name} height="100px" />
        </Box>
      )}


    <br/>
    <br/>
    <Button variant="contained" color="success">
    Submit
    </Button>
    </>
  );
};

export default Listing;