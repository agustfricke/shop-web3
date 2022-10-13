import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import Loader from './Loader'
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap'






const Pay = ({history}) => {

  const { currentAccount, connectWallet, sendTransaction, formData, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const { shippingAddress } = cart
    const to = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div>

      {isLoading
              ? <Loader />
              : (
                <>
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">


        <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
          <div className="flex justify-between flex-col w-full h-full">
            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
              <SiEthereum fontSize={21} color="#fff" />
            </div>
          </div>
          <div>

                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
            <p className="text-white font-semibold text-lg mt-1">
              Ethereum / Total  {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)} 
            </p>
          </div>
        </div>


        <div>
        {!currentAccount && (
            
          <Button  onClick={connectWallet}type='submit' className='rounded ml-4'>
          Connect Wallet
          </Button>

          )} 
          
          <Button onClick={handleSubmit} type='submit' className='rounded ml-4'>
            PAY
          </Button>
                
              
              
        </div>

      </div>
      <h1 className="  tracking-tight text-gray-900 sm:text-5xl ">
        <span className="block text-indigo-600 xl:inline">Secure</span>
        <br></br>

        <span className="block xl:inline">Payments</span>{' '}
      </h1>

    </div>


    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            


            
          </div>
          </>
            )}
        </div>
    



  );
};

export default Pay;
