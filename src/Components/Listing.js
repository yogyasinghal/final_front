import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { ethers } from "ethers";

const Listing = (props) => {
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

  function upload(){
    let data = {
      "pname":"",
      "imageurl":[]
    };
    data.pname=name
    data.imageurl=[selectedImage]
    // console.log("data = ",data);
    const config = {     
      headers: { 'content-type': 'multipart/form-data' }
    }
    console.log(data)
    axios.post(`/storeimageurl`,data)
    .then(res=>{
      console.log("post successfull");
    })
    .catch(err=>{
      alert('Fail to post');
      console.log(err);
    })
  }


  const submit = (e)=>{
    console.log("submit clicked");
    console.log(selectedImage);
    let data = new FormData();
    data.append("name",name);
    data.append("description",pincode);
    data.append("price",price);
    data.append("file",selectedImage);
    const config = {     
      headers: { 'content-type': 'multipart/form-data' }
    }
    console.log(data);
   axios.post(`http://localhost:4000/api/storeimageurl1`,data,config)
   .then(res=>{
     console.log("post successfull");
   })
   .catch(err=>{
     console.log("post unsuccessfull");
     console.log(err);
   })
  }


  async function execute() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer=provider.getSigner()
    if (typeof window.ethereum !== "undefined") {
      const contract = new ethers.Contract(props.contractAddress, props.abi, signer);
      try {
        //const properties = await contract.search(pincode);
        await contract.list(name,pincode.toString(),price.toString())
        //setProperties(['ab','cd','ef']);
        //properties.map((singleProperty)=>{
          //let temp= contract.price(singleProperty)
          //setPrice([...price,temp])
        //})
        //console.log("Prices in App.js",price)
        //console.log("Properties in App.js", properties)

      } catch (error) {

        console.log(error);
        //console.log(contractAddress)
        //console.log(signer)
      }
    } else {
      console.log("Please install MetaMask");
    }
  };

  return (
    <>
    
      
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
          Select Image
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
    
    <Button variant="contained" color="success" style={{ margin: 10}} onClick={()=>{submit()}}>
    Upload
    </Button>
    <Button variant="contained" color="success" style={{ margin: 10}} onClick={()=>{execute()}}>
    Submit
    </Button>
    
    </>
  );
};

export default Listing;