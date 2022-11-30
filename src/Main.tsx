import { useEffect, useState } from 'react';
import { useWeb3Context } from 'web3-react'
import { contractABI, contractAddress } from './contract';
import BigNumber from "bignumber.js";
import { convertFromWei, convertToWei } from './util';

const Main = () => {
    const context = useWeb3Context();
    console.log(context);
    const {library} = context;
    

    // const [accounts, setAccounts] = useState('');
    
    const showAccounts = async () => {
      const x = await library.eth.getAccounts();
      console.log(x);
      // setAccounts(x);
    };

    const tranferToken = async () => {
      const contract = await new library.eth.Contract(contractABI, contractAddress);

      await contract.methods.transfer("0x9FD24630F89D7C651e4A23De3c60fee3C0D89C4C", convertToWei(0.001))
      .send({
          from: context.account,
      })
      .once('transactionHash', function (res: any) {
          if (res && typeof res !== 'undefined') {
              console.log("tx hash recived");
          }
      })
      .on('confirmation', function (res: any) {
        console.log("tx confirmed");
      });

      const transferEvents = await contract.getPastEvents("Transfer", {
          filter: {},
          fromBlock: 0,
          toBlock: "latest",
      });
      console.log("transferEvents",transferEvents);
      
    }


    const tranferToken2 = async () => {
      const contract = await new library.eth.Contract(contractABI, contractAddress);

      await contract.methods.transferFrom(context.account,"0x9FD24630F89D7C651e4A23De3c60fee3C0D89C4C", convertToWei(0.001))
      .send({
          from: context.account,
      })
      .once('transactionHash', function (res: any) {
          if (res && typeof res !== 'undefined') {
              console.log("tx hash recived");
          }
      })
      .on('confirmation', function (res: any) {
        console.log("tx confirmed");
      });
      
    }

    const showOwner = async () => {
      const contract = await new library.eth.Contract(contractABI, contractAddress);
      const owner = await contract.methods.owner().call();
      console.log("owner",owner);

      // const transferEvents = await contract.getPastEvents("Transfer", {
      //     filter: {},
      //     fromBlock: 0,
      //     toBlock: "latest",
      // });
      // console.log("transferEvents",transferEvents);
      
    }

    const showBalance = async () => {
      // await library.eth.sendTransaction({
      //   from:"0x66F877f485C296b2170868734E10585420E4e887",
      //   to:"0x9FD24630F89D7C651e4A23De3c60fee3C0D89C4C",
      //   value: library.utils.toWei("0.002","ether")
      // })


      // const abi = [{"inputs":[],"name":"getMessage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_message","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}]
      // const contract = await new library.eth.Contract(abi, "0x44E84A10341BF772906c37fFc30CDbb132eA35f2");
      // let msg = await contract.methods.getMessage().call();
      // console.log(msg);
      
      // await contract.methods.setMessage("Hello world").send({
      //     from: "0x66F877f485C296b2170868734E10585420E4e887",
      // })
      // .once('transactionHash', function (res: any) {
      //     if (res && typeof res !== 'undefined') {
      //         console.log("yo");
              
      //     }
      // })
      // .on('confirmation', function (res: any) {
      // });
      
      // msg = await contract.methods.getMessage().call();
      // console.log(msg);

      
      let balance = await library.eth.getBalance(context.account);
      console.log(parseFloat(balance));
      console.log("balance In ether",parseFloat(convertFromWei(balance)));

      // let balance = await contract.methods.balanceOf(context.account).call();
    };
      
    

    const bignumberEqn = () => {
      let a=2,b=4;
      // (a+b)^2/(b^2 + (a-b))
      let x: any = new BigNumber(a);
      let y: any = new BigNumber(b);

      let answer = x.plus(y).multipliedBy(x.plus(y)).dividedBy(y.multipliedBy(y).plus(x.minus(y)));
      console.log("answer",answer);
      
    }



  return <>
  <p>{context.account}</p>
  {/* <p>{accounts}</p> */}
  <button onClick={showAccounts}>Show Accounts</button>
  <button onClick={showOwner}>Show Owner</button>
  <button onClick={showBalance}>Show Balance</button>
  <button onClick={tranferToken}>Transfer Token</button>
  <button onClick={tranferToken2}>Transfer Token 2</button>
  <button onClick={bignumberEqn}>Show Big Number Equation and answer</button>
  </>
}

export default Main;