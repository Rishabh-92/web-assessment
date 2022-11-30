import React from 'react';
// import Web3Provider, { Connectors } from 'web3-react';
import Web3 from 'web3';
import logo from './logo.svg';
import './App.css';
import Web3Provider,{ Connectors } from 'web3-react';
import Connect from './Connect';

// const InfuraApiKey = 'b0028b6ead6c45c693338d1ee60b5c81';

function App() {

  const { InjectedConnector, NetworkOnlyConnector } = Connectors;
   
  const MetaMask = new InjectedConnector({ supportedNetworks: [5] })//Goerli
   
  const Infura = new NetworkOnlyConnector({
    providerURL: 'https://goerli.infura.io/v3/b0028b6ead6c45c693338d1ee60b5c81'
  })
   
  const connectors = { MetaMask, Infura }
  // const connectors = { MetaMask }
  // console.log(Web3());
  
  return (
    <Web3Provider
      connectors={connectors}
      libraryName={'web3.js'}
      web3Api={Web3}
    >
      <Connect />
      {/* <div className="App"> */}
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div> */}
    </Web3Provider>
  );
}

export default App;
