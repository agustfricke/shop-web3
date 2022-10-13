import React, { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router';


import Message from '../components/Message';
import { addToCart, deleteCart } from '../actions/cartActions';

export default function Cart({ match, location, history }) {


  const productId = match.params.id
  const quantity = location.search ? Number(location.search.split('=')[1]) : '1'

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity))
    }
  }, [dispatch, productId, quantity])

  const deleteFromCartHandler = (id) => {
    dispatch(deleteCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <>
      {cartItems.length === 0 ? (



        <a
          href='/'
          className="mt-15 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cart is empty...  Go Back
        </a>
      ) : (
        <div>
          <div class="container mx-auto mt-10">
            <div class="flex shadow-md my-10">
              <div class="w-3/4 bg-white px-10 py-10">
                <div class="flex justify-between border-b pb-8">
                  <h1 class="font-semibold text-2xl">Shopping Cart</h1>
                </div>
                <div class="flex mt-10 mb-5">
                  <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                  <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Quantity</h3>
                  <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Price</h3>
                </div>
                {cartItems.map(item => (

                  <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                    <div class="flex w-2/5">
                      <div class="w-20">
                        <img class="h-24" src={`http://18.231.149.118${item.image}`}  alt={item.name} />
                      </div>
                      <div class="flex flex-col justify-between ml-3 flex-grow">
                        <span class="font-bold text-sm"><a to={`/product/${item.product}`} className='text-link'>{item.name}</a></span>

                        <button href="#" class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                          onClick={() => deleteFromCartHandler(item.product)}>
                          Remove</button>

                      </div>
                    </div>

                    <div class="flex justify-center w-1/5">
                      <span class="text-center w-1/5 font-semibold text-sm">{item.quantity}</span>
                    </div>
                    <span class="text-center w-1/5 font-semibold text-sm">{item.price} ETH</span>
                  </div>
                ))}
                <a href="/" class="flex font-semibold text-indigo-600 text-sm mt-10">

                  <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                </a>
              </div>

              <div id="summary" class="w-1/4 px-8 py-10">
                <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                <div class="flex justify-between mt-10 mb-5">
                  <span class="font-semibold text-sm uppercase">Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
                </div>


                <div class="border-t mt-8">
                  <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span>{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}</span>
                  </div>
                  <button
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    type='submit'
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    CHECK OUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

