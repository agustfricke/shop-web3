import React, { useState, useEffect } from "react";
import { StarIcon } from '@heroicons/react/20/solid'
import { Link, useParams } from 'react-router-dom'
import Message from './Message';
import Loader from './Loader'
import { useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating'
import { listProductsDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'



const SoloProduct = ({ match, history }) => {

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const createReview = useSelector(state => state.createReview)
    const { loading: loadingProductReview, error: errorProductReview, success: successProductReview } = createReview

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch(listProductsDetails(match.params.id))

    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?quantity=${quantity}`)

    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
            rating,
            comment
        }
        ))
    }

    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
                    <div className="flex flex-col justify-start items-start w-full space-y-9">
                        <div className="flex justify-start flex-col items-start space-y-2">
                            <a 
                            href="/"
                            className="flex flex-row items-center text-gray-600 hover:text-gray-500 space-x-1">
                                <svg className="fill-stroke" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.91681 7H11.0835" stroke="currentColor" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.91681 7L5.25014 9.33333" stroke="currentColor" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.91681 7.00002L5.25014 4.66669" stroke="currentColor" strokeWidth="0.666667" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="text-sm leading-none">Back</p>
                            </a>

                        </div>

                        <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 ">
                            <div className=" flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-full">
                                <div className="flex flex-col justify-start items-start w-full space-y-4">
                                    <p className="text-xl md:text-2xl leading-normal text-gray-800">{product.name}</p>
                                    <p className="text-base font-semibold leading-none text-gray-600">{product.price} ETH</p>
                                </div>
                                <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
                                    <img 
                                    src={`http://18.231.149.118${product.image}`}
                                    alt="headphones" />
                                </div>
                            </div>

                            <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">

                                <p className="text-3xl tracking-tight text-gray-900">Only for {product.price} ETH</p>
                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.count_in_stock === 0 || product.count_in_stock < 0}

                                    type="submit"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Add to cart
                                </button>

                                <div className='py-10' >
                                    <h3 className="sr-only">Description</h3>

                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{product.description}</p>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-gray-900">Status</h2>

                                    <div className="mt-4 space-y-6">
                                        <p className="text-sm text-gray-600"> {product.count_in_stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                                    </div>
                                </div>

                                {product.count_in_stock > 0 && (






                                    // drop-down list
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quantity:</Col>
                                            <Col xs='auto' className='my-1'>
                                                <Form.Control as='select' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                                    {
                                                        [...Array(product.count_in_stock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}




                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-gray-900 ">Leave a review</h2>
                                    {loadingProductReview && <Loader />}
                                    {successProductReview && <Message variant='success'>Review submitted</Message>}
                                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                    <form onSubmit={submitHandler}
                                    >
                                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                                            <div className="grid grid-cols-3 gap-6">
                                                <div className="col-span-3 sm:col-span-2">
                                                </div>
                                            </div>

                                            <div>

                                                <div className="mt-1">
                                                    <textarea
                                                        type="text"
                                                        id="body"
                                                        rows={3}
                                                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="Type Here!"
                                                    />
                                                </div>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''>Select number of stars ...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Nice</option>
                                                    <option value='4'>4 - Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                            <button
                                                disabled={loadingProductReview}
                                                type='submit'
                                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                POST
                                            </button>
                                        </div>

                                    </form>

                                </div>





                            </div>
                        </div>
                    </div>
                </div>

            </div>

                                                    <center>
            <h4>Reviews</h4>
                                    {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                                    <ListGroup variant='flush'>
                                        {product.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.user}</strong>
                                                <Rating value={review.rating} color={'#ffa900'} />
                                                <p>{review.created_at.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}
                                        </ListGroup>
                                        </center>


        </div>
                
            

    );
};

export default SoloProduct;