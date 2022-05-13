// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./Components/Home";
import Navbar from './Components/Navbar';
import Listing from './Components/Listing';
import Transaction from './Components/Transaction';
import { useEffect, useState } from "react";
import { ethers } from "ethers";

import './App.css';

function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [properties, setProperties] = useState([]);
  //const [price,setPrice]=useState([]);
  const contractAddress = "0xE3901c3429e6496bFd62Edf12265EB670970f9a2";

  const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "add",
          "type": "string"
        }
      ],
      "name": "createescrow",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "add",
          "type": "string"
        }
      ],
      "name": "finaltransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "add",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "pincode",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price1",
          "type": "uint256"
        }
      ],
      "name": "list",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "add",
          "type": "string"
        }
      ],
      "name": "verify",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "escrowadd",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "homeaddtoprice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "pincode",
          "type": "uint256"
        }
      ],
      "name": "search",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "state",
      "outputs": [
        {
          "internalType": "enum deal.STATE",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
        console.log("connected");
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  };

  async function execute(pincode) {
    let proper=[]
    if (typeof window.ethereum !== "undefined") {


      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        
        //const properties = await contract.search(pincode);
        let prope=(await contract.search(pincode));
        //setProperties(['ab','cd','ef']);
        //properties.map((singleProperty)=>{
        //let temp= contract.price(singleProperty)
        //setPrice([...price,temp])
        //})
        //console.log("Prices in App.js",price)
        console.log("Properties in App.js", properties)
        for(let i=0;i<prope.length;i++){
          if(prope[i]!=""){
            proper.push(prope[i])
          }
        }
        setProperties(proper);
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
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path = '/' element = {<Home/>}/> */}
          {/* <Route path = '/home' element = {<Home/>}/> */}
          <Route path='' element={
            <>
              <Navbar isConnected={isConnected} hasMetamask={hasMetamask} setIsConnected={setIsConnected} setHasMetamask={setHasMetamask} connect={connect} abi={abi} contractAddress={contractAddress} signer={signer} />
              <Home isConnected={isConnected} hasMetamask={hasMetamask} setIsConnected={setIsConnected} setHasMetamask={setHasMetamask} connect={connect} execute={execute} abi={abi} contractAddress={contractAddress} properties={properties} signer={signer} />
              {/* <Transaction  abi={abi} contractAddress={contractAddress} signer={signer}  /> */}
            </>
          } />
          <Route path='/listing' element={
            <>
            <Navbar isConnected={isConnected} hasMetamask={hasMetamask} setIsConnected={setIsConnected} setHasMetamask={setHasMetamask} connect={connect} abi={abi} contractAddress={contractAddress} signer={signer} />
            <Listing abi={abi} contractAddress={contractAddress} signer={signer} />
            </>} />
          <Route path='/transaction' element={
            <>
            <Navbar isConnected={isConnected} hasMetamask={hasMetamask} setIsConnected={setIsConnected} setHasMetamask={setHasMetamask} connect={connect} abi={abi} contractAddress={contractAddress} signer={signer} />
            <Transaction abi={abi} contractAddress={contractAddress} signer={signer} />
            </>
            } />
          
        </Routes>
      </Router>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
