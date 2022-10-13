import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'


function OrderScreen({ match, history }) { //history for make sure that if a user is not logged in, he can't see deliver page
    const orderId = match.params.id
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (!loading && !error) {
        order.itemsPrice = order.order_items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
    }


   

    useEffect(() => {

        if(!userInfo){
            history.push('/login')
        }

        if (!order || order._id !== Number(orderId) || successDeliver ) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        } 
    }, [dispatch, order, orderId, successDeliver])

   

    const deliverHandler = () => {
        dispatch(deliverOrder(order ))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            
            <h1>Order: {orderId}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>Name: {order.user.user_name}</p>
                            <p>Email: {order.user.email}</p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shipping_address.country}, {order.shipping_address.city},
                                {' '}
                                {order.shipping_address.address}, {order.shipping_address.postal_code}
                            </p>
                            

                        </ListGroup.Item>

                        

                        <ListGroup.Item>
                            <h2>Items</h2>
                            {order.order_items.lenght === 0 ? <Message>
                                Order is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {order.order_items.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Link to={`/product/${item.product}`}>
                                                        <Image src={`http://18.231.149.118${item.image}`} fluid rounded />
                                                    </Link>
                                                </Col>

                                                <Col md={6}>
                                                    <Link to={`/product/${item.product}`} className='text-link'>
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={5}>
                                                    {item.quantity} X ${item.price} = ${(item.quantity * item.price)}
                                                </Col>

                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>

                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Summary</h2>
                            </ListGroup.Item>

                           

                           

                            <ListGroup.Item>
                                <Row>
                                    <Col>${order.total_price} ETH</Col>
                                </Row>
                            </ListGroup.Item>

                           
                        </ListGroup>
                        

                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default OrderScreen;
