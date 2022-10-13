import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { listMyOrders } from '../actions/orderActions'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import Loader from "./Loader";
import Message from "./Message";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { SiEthereum } from "react-icons/si";
import { listOrders } from '../actions/orderActions'



export default function MiPerfil({ history }) {

  const dispatch = useDispatch()

  const orderList = useSelector(state => state.orderList)
  const { loading, error, orders } = orderList


  useEffect(() => {
    
    dispatch(listOrders())
    
  }, [dispatch, history])


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const { currentAccount, connectWallet, sendTransaction, formData, isLoading } = useContext(TransactionContext);


  return (
    <>

      <div>
        <div>
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="">

            
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                    your personal account
                  </h2>

            
            <div className="flex min-h-full items-center justify-center  px-4 sm:px-6 lg:px-8">

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
                    Ethereum
                  </p>
                </div>
              </div>
        {!currentAccount && (
            
            <button  
            onClick={connectWallet} type='submit' 
            className="ml-4 bg-indigo-600 py-1 px-5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Connect Wallet
            </button>
          )} 
  
              </div>

            <div className='ml-10'>
             
                    
              <img className="h-40 w-55 rounded-full" src={`http://18.231.149.118${userInfo.image}`} alt="" />
              <br></br>
              <h3 className="text-lg font-medium leading-6 text-gray-900">{userInfo.user_name} &nbsp;&nbsp;&nbsp;&nbsp;
                <a
                style={{textDecoration: 'none'}}
                  href={"/#/editprofile"}
                  className=" bg-indigo-600 py-1 px-5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  EDIT
                </a>
              </h3>
              </div>


              
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Username</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{userInfo.user_name}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{userInfo.email}</dd>
                </div>
                
              </dl>
            </div>
          </div>
        </div>
      </div>


      <div>
      <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Your Orders 
      </h2>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                              

                            {orders.map(order => (
                                  <>
                                  {userInfo.user_name === order.user.user_name &&
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.created_at.substring(0, 10)}</td>
                                        <td>{order.total_price}</td>


                                        <td>
                                            <a href={`/#/order/${order._id}`} className='m-1' style={{textDecoration: 'none'}}>
                                                <Button 
                                                    className="group relative flex  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                    Details
                                                </Button>
                                            </a>
                                        </td>
                                    </tr>
                                    }
                                </>


                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>

      

    </>
  )
}