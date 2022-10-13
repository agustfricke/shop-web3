import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen({ history }) {

  const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);



    

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, history])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            totalPrice: cart.totalPrice
        }))
    }

    return (
        <div className='mt-10 '>

            

            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.country}, {cart.shippingAddress.city},
                                {' '}
                                {cart.shippingAddress.address}, {cart.shippingAddress.postalCode}
                            </p>
                        </ListGroup.Item>

                        

                        <ListGroup.Item>
                            <h2>Items</h2>
                            {cart.cartItems.lenght === 0 ? <Message>
                                Your cart is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Link to={`/product/${item.product}`}>
                                                        <Image  src={`http://18.231.149.118${item.image}`}  fluid rounded />
                                                    </Link>
                                                </Col>

                                                <Col md={6}>
                                                    <Link to={`/product/${item.product}`} className='text-link'>
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={5}>
                                                     ETH {item.price} 
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
                                <h2>Total</h2>
                            </ListGroup.Item>

                          

                            <ListGroup.Item>
                                <Row>
                                    <Col md={8}>Total:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <div className="d-grid gap">
                                    <Button
                                        type='button'
                                        className='btn-block'
                                        onClick={placeOrder}
                                    >
                                        Place Order
                                    </Button>
                                </div>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default PlaceOrderScreen;
