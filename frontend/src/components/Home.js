import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";

import Loader from './Loader'
import Rating from './Rating'
import Message from "./Message";
import { listProducts } from "../actions/productActions";
import { Link } from 'react-router-dom'

  
function Home(history) {

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { error, loading, products } = productList;



  let keysearch = history.location.search
  console.log(keysearch)
  useEffect(() => {
    dispatch(listProducts(keysearch));
  }, [dispatch, keysearch]);


return (
  <>
    {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          :
      <div className="bg-white">
        <h1 className=" font-bold tracking-tight text-center mt-9 text-gray-900 sm:text-3xl ">
              <span className="block xl:inline">Our</span>{' '}
              <span className="block text-indigo-600 xl:inline">Products</span>
            </h1>
        <div className="mx-auto max-w-2xl py-10  sm:px-2 lg:max-w-7xl lg:px-4">
        
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                 <Link to={`/product/${product._id}`}>
                 <h3 className="text-sm text-gray-700">
                      <a href='{product.id}'>
                        <span aria-hidden="true" className="absolute inset-0" 
                        style={{textDecoration: 'none'}}/>
                        {product.name}
                      </a>
                      
                    </h3>
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={`http://18.231.149.118${product.image}`}

                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                </Link>

                <div className="mt-4 flex justify-between">
                  <div>
                    
                    <p className="mt-1 text-sm text-gray-500"> <Rating value={product.rating} color={'#ffa900'} />
                        <p>{`${product.num_reviews} reviews`}</p></p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price} ETH</p>   
                     
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      }

      </>
    )
  }

export default Home;