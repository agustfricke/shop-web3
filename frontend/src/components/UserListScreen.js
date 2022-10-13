import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers, deleteUser } from '../actions/userActions'
import { FaRegEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";



function UserListScreen({ history }) {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.deleteUser)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.is_admin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {

        if (window.confirm('Are you shure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }

    }

    return (
        <div>
            <h1>Users</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Pic</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>
                                        <img
                                            className="h-8 w-11 rounded-full"
                                            src={`http://18.231.149.118${userInfo.image}`}
                                            alt=""
                                        />
                                            </td>
                                        <td>{user.user_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.is_admin ? (
                                            <GrCheckboxSelected />
                                        ) : (
                                            <GrCheckbox />
                                        )}</td>
                                        <td className='text-center'>
                                            <a href={`/#/admin/user/${user._id}/edit`} className='m-1'>
                                                <Button >
                                                    <FaRegEdit />
                                                </Button>
                                            </a>

                                            <Button onClick={() => deleteHandler(user._id)}>
                                            <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default UserListScreen