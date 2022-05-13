// import React from 'react';

// export default function Home(){
//     return(
//         <div> home js jjjjjjjjjjjjjjjjjjjjjjjj</div>
//     )
// }

import * as React from 'react';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, CardActionArea, CardActions } from '@mui/material';

import { makeStyles } from '@mui/styles';

import ShowProperty from './ShowProperty';

import { ethers } from "ethers";



const useStyles = makeStyles({
  cardstyle: {
    marginTop: '3vh',
    margin: 'auto',
    flexDirection: 'column',
  },
  submit: {
    marginLeft: '2vw',
  },
});
// className={clasess.cardstyle}

export default function Home(props) {
  const classes = useStyles();
  const [pincode, setPincode] = useState(0);
  const [showFlag, setFlag] = useState(false)
  const [buttonClick, setButtonClick] = useState(false);

  async function submitValue(event) {
    event.preventDefault();
    setFlag(true);
    console.log(pincode);
    // <ShowProperty/>
    // console.log("end of submit ");
  }



  return (
    //   <h1>pincode</h1>
    <>
      <Card className={classes.cardstyle} sx={{ maxWidth: 345 }}>
        <CardActionArea  >
          <CardMedia
            component="img"
            height="240"
            width="240"

            //   image="/static/images/cards/contemplative-reptile.jpg"
            image="https://dp5zphk8udxg9.cloudfront.net/wp-content/uploads/2017/07/shutterstock_198883310-e1499838393321.jpg"
            alt="green iguana"

          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Properties
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Everyone Deserves the Opportunity of Home
            </Typography>

          </CardContent>
        </CardActionArea>
        <CardActions>
          <TextField
            id="standard-number"
            label="Pin Code"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={e => setPincode(e.target.value)}
          />
          <Button
            size="small"
            color="primary"
            onClick={() => {
              props.execute(pincode); setButtonClick(true)
            }}
            className={classes.submit}
            type="submit"
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      {/* {console.log(props.properties)} */}
      {/* {console.log("properties in Home",props.properties)} */}
      {buttonClick ? props.properties.length > 0 ? <ShowProperty properties={props.properties} abi={props.abi} contractAddress={props.contractAddress} signer={props.signer}/> : "Sorry No properties are present at given address." : ""}
    </>
  );
}

// to make property show only on submit button make a seperate function
// for input field and then set flag = false in that function