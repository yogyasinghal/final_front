// import React from 'react';

// export default function Transaction(){
//     return(
//         <div> Transaction js jjjjjjjjjjjjjjjjjjjjjjjj</div>
//     )
// }

import * as React from 'react';
import { useState, useEffect } from 'react';

//import { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { ethers } from "ethers";
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
    image: {
        marginTop: '3vh',
        margin: 'auto',
        // flexDirection: 'column',
        width: '40vw'
    },
    submit: {
        marginLeft: '2vw',
    },
});






export default function Transaction(props) {
    //let prope=""
    const [prope, setPrope] = useState("");
    const [images, setImages] = useState([]);
    const [singleproperty, Setsingleproperty] = useState("");
    const [imagesLoaded, setImageLoaded] = useState(false);
    const useStyles = makeStyles({
    image: {
        marginTop: '3vh',
        margin: 'auto',
        // flexDirection: 'column',
        width: '40vw'
    },
    submit: {
        marginLeft: '2vw',
    },
});
    const classes = useStyles();

    function loadImages(singleproperty) {

        //let ar=[]
        //setImages([])
        let a = 1
        axios.get(`/getimages/${singleproperty}`)
            .then(res => {
                console.log(res.data)
                images.push(res.data);
                console.log(images)
                if ((images.length > 0)) {
                    setImageLoaded(true)
                }
            })
            .catch(res => {
                console.log("error res = ", res);
            });
    };
    async function execute() {
        if (typeof window.ethereum !== "undefined") {
          const contract = new ethers.Contract(props.contractAddress, props.abi, props.signer);
          try {
            //prope=(await contract.escrowadd());
            setPrope(await contract.escrowadd())
            console.log("**************",prope)
            if(prope!=""){
                console.log("?????????",prope)
                loadImages(prope)
            }
            
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("Please install MetaMask");
        }
    };

    async function final() {
        if (typeof window.ethereum !== "undefined") {
            const contract = new ethers.Contract(props.contractAddress, props.abi, props.signer);
            try {
                await contract.finaltransaction(prope)
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    };

    useEffect(() => {
        execute()
      },[prope]);


    
    // let count=0
    // return (<h2>hello</h2>)
    return (<>
        {/* {singleproperty.length > 0 && images.length > 0} ? */}
        <div>
                {imagesLoaded ?
                    images.map((imgArr) => (
                        <>
                            <Carousel className={classes.image}>
                                {imgArr.map((singleImage) => (
                                    <div>
                                        <img src={singleImage} />
                                        {/* <p className="legend">imgArr</p> */}
                                    </div>
                                ))}
                            </Carousel>
                            <h2> {prope} </h2>
                            <Button variant="contained" color="success" onClick={() => {final()}}>
                                Complete Transaction
                            </Button></>
                    )) : ""
                }
            </div>
        {/* :<h2>There are no currently pending transactions</h2> */}
    </>
    );
}

// to make property show only on submit button make a seperate function
// for input field and then set flag = false in that function