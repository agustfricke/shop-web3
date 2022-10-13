import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants';


function UserEditScreen({ match, history }) {

    const userId = match.params.id

    const [user_name, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [is_admin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/users')
        } else {
            if (!user.user_name || user.id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setUserName(user.user_name)
                setEmail(user.email)
                setPassword(user.password)
                setIsAdmin(user.is_admin)
            }
        }
    }, [user, userId, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({
            id: user.id, user_name, email, is_admin
        }))
    }

    return (
        <div>
            <Link to='/admin/users'>
                Go Back
            </Link>
                <h1 className='text-center'>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type='user_name'
                                    placeholder='Enter Username'
                                    value={user_name}
                                    onChange={(e) => setUserName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email' className='py-2'>
                                <Form.Label>Email Adress</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='password' className='py-2'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='is_admin' className='py-2'>
                                <Form.Label>Is Admin</Form.Label>
                                <Form.Check
                                    type='checkbox'
                                    checked={is_admin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <div className='text-center py-2'>
                                <Button type='submit' className='rounded'>Update</Button>
                            </div>

                        </Form>
                    )}
        </div>
    )
}

export default UserEditScreen;
