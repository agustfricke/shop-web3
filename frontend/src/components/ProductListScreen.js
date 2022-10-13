import React, { useEffect } from 'react';
import { Table, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { FaRegEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';


import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


function ProductListScreen({ history, match }) {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.is_admin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createProduct])

    const deleteHandler = (id) => {
        if (window.confirm('Are you shure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        dispatch(createProduct())
    }


    return (
        <Container>
            <Row>
                <Col sm={10}>
                    <h1>Products</h1>
                </Col>
                <Col sm={2}>
                    <Button size='sm' className='my-3' onClick={createProductHandler}>
                        CREATE PRODUCT
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Price $</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.price}</td>
                                        <td className='text-center'>
                                            <a href={`/#/admin/product/${product._id}/edit`} className='m-1'>
                                                <Button>
                                                    < FaRegEdit/>
                                                </Button>
                                            </a>

                                            <Button onClick={() => deleteHandler(product._id)}>
                                            <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </Container>
    )
}

export default ProductListScreen