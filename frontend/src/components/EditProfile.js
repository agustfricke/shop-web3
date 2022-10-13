import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "./Message";
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import axios from 'axios'
import Loader from './Loader'




export default function EditProfile({ history }) {

  const [user_name, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [uploading, setUploading] = useState(false)


  const dispatch = useDispatch(history)

  const userDetails = useSelector(state => state.userDetails)
  const { error, loading, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile



  useEffect(() => {
    if (!userInfo.email === "") {
      history.push('/login')
    } else {
      if (!user || !user.user_name || success || userInfo.id !== user.id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setUserName(user.user_name)
        setEmail(user.email)
        setBio(user.bio)
        setImage(user.image)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    history.push('/profile')

    if (password !== confirmPassword) {
      setMessage('Passwords must match ')
    } else {
      dispatch(updateUserProfile({
        'id': user._id,
        'user_name': user_name,
        'email': email,
        'bio': bio,
        'image': image,
        'password': password,
      }))
    }
  }
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    formData.append('user_id', user._id) 

    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data' ,
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.post('http://18.231.149.118/users/profile/image/', formData, config)

      setImage(data)
      setUploading(false)

    } catch (error) {
      setUploading(false)
    }
  }




  return (
    <>

      {loading ?
        <Loader />
        : error
          ? <Message variant='danger'>{error}</Message>
          : (
            <div>
              {message && <Message variant='danger'>{message}</Message>}
              {error && <Message variant='danger'>{error}</Message>}

              <div className="md:grid md:grid-cols-4 md:gap-6">

                <div className="md:col-span-1">


                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">

                  <form action="#" method="POST" onSubmit={submitHandler}>
                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                      <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-3 gap-6">
                          <div className="col-span-3 sm:col-span-2">
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <input
                                value={user_name}
                                onChange={(e) => setUserName(e.target.value)}
                                type="text"
                                id="user_name"
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Full Name"
                              />
                            </div>
                            <br></br>

                            <div className="mt-1 flex rounded-md shadow-sm">

                              <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="E-mail"
                              />
                            </div>

                            <br></br>

                           
                          </div>
                        </div>

                        <div>
                          <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                            About
                          </label>
                          <div className="mt-1">
                            <textarea
                              type="text"

                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                              id="bio"
                              name="bio"
                              rows={3}
                              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="About You"
                              defaultValue={''}
                            />
                          </div>

                        </div>
                        <br></br>
                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                          Update Your Password
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">

                          <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password"
                          />
                        </div>

                        <div className="mt-1 flex rounded-md shadow-sm">

                          <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            id="confirmPassword"
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Confirm Password"
                          />
                        </div>



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
                        </Form.Group>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
    </>
  )
}