import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddess } from '../actions/cartActions'
import Container from 'react-bootstrap/Container';

function ShippingScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddess({ address, city, postalCode, country }))
        history.push('/pay')
    }

    return (
        <>
        <Container>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Shipping Information
                  </h2>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='country' className='py-2'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='country'
                        placeholder='Enter your country'
                        values={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city' className='py-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='city'
                        placeholder='Enter your city'
                        values={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='address' className='py-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='address'
                        placeholder='Enter your address'
                        values={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode' className='py-2'>
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control
                        required
                        type='postalCode'
                        placeholder='Enter your postal code'
                        values={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <div className='py-2' >
                    <Button type='submit' className='rounded'>
                        Continue
                    </Button>
                </div>
            </Form>
            </Container>
            </>
    )
}

export default ShippingScreen;
