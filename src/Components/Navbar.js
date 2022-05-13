import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import { useEffect, useState } from "react";


export default function ButtonAppBar(props) {
  const navigate = useNavigate();
  let prope = ""
  async function execute() {

    if (typeof window.ethereum !== "undefined") {


      const contract = new ethers.Contract(props.contractAddress, props.abi, props.signer);
      try {
        prope = (await contract.escrowadd());
        console.log(prope)
        if (prope == "") {
          alert("No Pending Transactions")
        }
        else {
          console.log("prope")
          navigate("/transaction")
        };
      }
      catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };


  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      props.setHasMetamask(true);
    }
  });




  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >

            <MenuIcon />
          </IconButton> */}
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} edge="start" sx={{ mr: 2 }}>
            Home
          </Typography> */}
          <Button
            color="inherit"
            component={Link}
            to="/"
            size="medium"
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/listing"
            size="medium"
          >
            Listing
          </Button>
          <Button
            color="inherit"
            // component={Link}
            // to="/listing"
            size="medium"
            onClick={() => execute()}
          >
            Pending Transactions
          </Button>
          {/* <Button
            color="inherit"
            onClick={()=>{connect()}}
            size="medium"
            </Button>
          > */}
          <div>
            {props.hasMetamask ? (
              props.isConnected ? (
                "Connected! "
              ) : (
                <button onClick={() => props.connect()}>Connect</button>
              )
            ) : (
              "Please install metamask"
            )}
          </div>


        </Toolbar>

      </AppBar>
    </Box >
  );
}
