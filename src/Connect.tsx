import { useEffect } from 'react'
import { useWeb3Context } from 'web3-react'
import Main from './Main'

const Connect = () => {
    const context = useWeb3Context()
 
    const connectToWallet = () => {
        context.setFirstValidConnector(['MetaMask', 'Infura'])
        // context.setFirstValidConnector(['MetaMask'])
    }
    if (!context.active && !context.error) {
        // loading
        console.log('Loading');
    } else if (context.error) {
        //error
        console.log('error');
    } else {
        // success
        console.log('success');
    }
    return <>
    <button onClick={connectToWallet}>Connect</button>
    <Main />
    </>
    
}

export default Connect;