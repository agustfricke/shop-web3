import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductsDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';



function ProductEditScreen({ match, history }) {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('0')
    const [count_in_stock, setCountInStock] = useState('0')
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/products')
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductsDetails(productId))
            } else {
                setName(product.name)
                setDescription(product.description)
                setImage(product.image)
                setCategory(product.category)
                setBrand(product.brand)
                setPrice(product.price)
                setCountInStock(product.count_in_stock)
            }
        }
    }, [dispatch, product, productId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            description,
            image,
            category,
            brand,
            price,
            count_in_stock
        }))
    }

    // Its going to be async, because we need to send a post request, so i use axios
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId) //from our product views

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data' //lets me send that image field with post request
                }
            }

            const { data } = await axios.post('/products/upload/', formData, config)
            
            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/products'>
                Go Back
            </Link>
                <h1 className='text-center'>Product Form</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description' className='py-2'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type='description'
                                    placeholder='Enter Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image' className='py-2'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>
                                <Form.Control
                                    label='Choose file'
                                    type='file'
                                    onChange={uploadFileHandler}
                                >
                                </Form.Control>
                                {uploading && <Loader />}
                            </Form.Group>

                            <Form.Group controlId='category' className='py-2'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type='category'
                                    placeholder='Enter Category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='brand' className='py-2'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type='brand'
                                    placeholder='Enter Brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price' className='py-2'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='price'
                                    placeholder='Enter Price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='count_in_stock' className='py-2'>
                                <Form.Label>Count in Stock</Form.Label>
                                <Form.Control
                                    type='count_in_stock'
                                    placeholder='Count in Stock'
                                    value={count_in_stock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <div className='text-center py-2'>
                                <Button type='submit' className='rounded'>Submit</Button>
                            </div>

                        </Form>
                    )}
        </div>
    )
}

export default ProductEditScreen;
