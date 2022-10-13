import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from '../actions/orderActions'


function OrderListScreen({ history }) {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.is_admin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])


    return (
        <div>
            <h1>Orders</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.user_name}</td>
                                        <td>{order.created_at.substring(0, 10)}</td>
                                        <td>{order.total_price}</td>

                                   
                                        <td>
                                            <a href={`/#/order/${order._id}`} className='m-1' style={{textDecoration: 'none'}}>
                                                <Button 
                                                    className="group relative flex  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                    DETAILS
                                                </Button>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default OrderListScreen