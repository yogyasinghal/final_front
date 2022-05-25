import React, { Component } from 'react';
import { useState, useEffect } from 'react';
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



export default function ShowProperty(props) {
    let count = 0
    const classes = useStyles();
    //let price = []
    const [price, setPrice] = useState([]);
    const [images, setImages] = useState([]);
    //let images = [];
    const [imagesLoaded, setImageLoaded] = useState(false);
    //const [images, setImages] = useState([]);
    let images1 = [[
        "https://dp5zphk8udxg9.cloudfront.net/wp-content/uploads/2017/07/shutterstock_198883310-e1499838393321.jpg",
        "https://dp5zphk8udxg9.cloudfront.net/wp-content/uploads/2017/07/shutterstock_198883310-e1499838393321.jpg",
        "https://dp5zphk8udxg9.cloudfront.net/wp-content/uploads/2017/07/shutterstock_198883310-e1499838393321.jpg"
    ], [
        "https://dp5zphk8udxg9.cloudfront.net/wp-content/uploads/2017/07/shutterstock_198883310-e1499838393321.jpg",
        "https://dp5zphk8udxg9.cloudfront.net/wp-content/uploads/2017/07/shutterstock_198883310-e1499838393321.jpg"
    ], [
        "https://dp5zphk8udxg9.cloudfront.net/wp-content/uploads/2017/07/shutterstock_198883310-e1499838393321.jpg",
        "https://dp5zphk8udxg9.cloudfront.net/wp-content/uploads/2017/07/shutterstock_198883310-e1499838393321.jpg",
        "https://dp5zphk8udxg9.cloudfront.net/wp-content/uploads/2017/07/shutterstock_198883310-e1499838393321.jpg",
        "https://dp5zphk8udxg9.cloudfront.net/wp-content/uploads/2017/07/shutterstock_198883310-e1499838393321.jpg"
    ]];

    async function execute() {
        if (typeof window.ethereum !== "undefined") {


            const contract = new ethers.Contract(props.contractAddress, props.abi, props.signer);
            try {
                //const properties = await contract.search(pincode);
                for (let i = 0; i < props.properties.length; i++) {
                    console.log("###########", props.properties[i])
                    let temp = await contract.homeaddtoprice(props.properties[i]);
                    price.push(parseInt(temp._hex, 16))
                    //console.log("@@@@@@@@@@@@@@",price)
                    if ((images.length == props.properties.length) && (price.length == props.properties.length)) {
                        setImageLoaded(true)
                    }
                }

                //setProperties(['ab','cd','ef']);
                //properties.map((singleProperty)=>{
                //let temp= contract.price(singleProperty)
                //setPrice([...price,temp])
                //})
                //console.log("Prices in App.js",price)
                //console.log("Properties in App.js", props.properties)
                console.log("price in", price)

            } catch (error) {

                console.log(error);
                //console.log(contractAddress)
                //console.log(signer)
            }
        } else {
            console.log("Please install MetaMask");
        }
    };

    async function buyProperty(address, cost) {
        if (typeof window.ethereum !== "undefined") {
            const contract = new ethers.Contract(props.contractAddress, props.abi, props.signer);
            try {
                console.log("biawugfucavu",address,cost)
                const arr1 = await contract.createescrow(address, { value: ethers.utils.parseUnits(cost, "ether") });
                console.log("hash id",arr1)
                //console.log(signer)
            } catch (error) {
                console.log("buy property error",error);
                //console.log(contractAddress)
                //console.log(signer)
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    function loadImages() {
        //let ar=[]
        //setImages([])
        let a = 1
        props.properties.map((pr1) => (axios.get(`http://localhost:4000/api/getimages/${pr1}`)
            .then(res => {
                //console.log("res.data cart = ", res);
                console.log(pr1)
                console.log("res.data", a);
                a += 1
                //ar=[res.data, ...ar]
                console.log("ffffffffffffff",res.data)
                images.push(res.data);
                if ((props.properties[props.properties.length - 1] == pr1) && (images.length == props.properties.length)) {
                    //setImageLoaded(true)
                    execute();
                }
                // setImages(res);
                //setImages([res.data, ...images]);

                //images = [res.data, ...images];
                //console.log("final ar", ar)
                //return ar
            })
            .catch(res => {
                console.log("error res = ", res);
            })));
        //setImageLoaded(true)
        //setImageLoaded(a=>!a)
        //setImages([...ar])
    };

    // async function fun1() {
    //     //console.log("1646464464",await loadImages());
    //     await loadImages()
    //     console.log("myimages", images)
    //     //setImageLoaded(true);
    // };
    //fun1();

    //loadImages()
    useEffect(() => { loadImages() }, [])
    console.log("imagesLoaded", imagesLoaded)
    console.log("--------------->Final OutPut:  ", images);
    console.log("price in showproperties", price)
    return (

        <>

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
                            <h2>{count = count + 1}: {props.properties[count - 1]} </h2>
                            <h2>price in eth: {price[count - 1]}</h2>
                            <Button variant="contained" color="success" onClick={() => {console.log("hfifiawigiawi9999999",props.properties[count - 1], price[count - 1]);buyProperty(props.properties[count - 1], price[count - 1].toString())}}>
                                BUY
                            </Button></>
                    )) : ""
                }
            </div>
        </>
    )
}
// });

// ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));

// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>















// before corousel

// import * as React from 'react';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import ListSubheader from '@mui/material/ListSubheader';
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';

// export default function ShowProperty(pincode) {
//     var num = Number(pincode.pincode);
//     console.log("pincode from showproperty = ",pincode);
//     const finalData = [];
//     itemData.map((item)=>{
//         // console.log(item.pincode);
//         if(item.pincode == num){
//             console.log("hello");
//             finalData.push(item);
//         }
//     })
//     console.log(finalData);

//   return (
//     <ImageList sx={{ width: 500, height: 450 }}>
//       <ImageListItem key="Subheader" cols={2}>
//         <ListSubheader component="div">December</ListSubheader>
//       </ImageListItem>
//       {finalData.map((item) => (
//         //   if(pincode={item.pincode}){
//         <ImageListItem key={item.img} >
//           <img
//             src={`${item.img}?w=248&fit=crop&auto=format`}
//             srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
//             alt={item.title}
//             loading="lazy"
//           />
//           <ImageListItemBar
//             title={item.title}
//             subtitle={item.author}
//             actionIcon={
//               <IconButton
//                 sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
//                 aria-label={`info about ${item.title}`}
//               >
//                 <InfoIcon />
//               </IconButton>
//             }
//           />
//         </ImageListItem>
//         //   }
//       ))}
//     </ImageList>
//   );
// }

// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     pincode: 12346,
//     title: 'Breakfast',
//     author: '@bkristastucchio',
//     rows: 2,
//     cols: 2,
//     featured: true,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     pincode: 12345,
//     title: 'Burger',
//     author: '@rollelflex_graphy726',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     pincode: 12340,
//     title: 'Camera',
//     author: '@helloimnik',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     pincode: 12340,
//     title: 'Coffee',
//     author: '@nolanissac',
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//     pincode: 12340,
//     title: 'Hats',
//     author: '@hjrc33',
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//     pincode: 12340,
//     title: 'Honey',
//     author: '@arwinneil',
//     rows: 2,
//     cols: 2,
//     featured: true,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     pincode: 12345,
//     title: 'Basketball',
//     author: '@tjdragotta',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//     pincode: 12345,
//     title: 'Fern',
//     author: '@katie_wasserman',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//     pincode: 12345,
//     title: 'Mushrooms',
//     author: '@silverdalex',
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     pincode: 12345,
//     title: 'Tomato basil',
//     author: '@shelleypauls',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//     pincode: 12346,
//     title: 'Sea star',
//     author: '@peterlaster',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     pincode: 12346,
//     title: 'Bike',
//     author: '@southside_customs',
//     cols: 2,
//   },
// ];
