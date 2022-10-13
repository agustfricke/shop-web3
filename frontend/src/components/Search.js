import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
 // useHistory is going to allow us to do is have access to the history inside of our components.

function Search() {

    const [keysearch, setKeysearch] = useState('')


    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keysearch) {
            history.push(`/?keysearch=${keysearch}`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }

    return (

        <Form
            onSubmit={submitHandler} className='d-flex'
        >
           

                        <input
                        onChange={(e) => setKeysearch(e.target.value)}
                        name="q"
                        type="text"
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Type here"
                      />
            <Button
                variant='dark'
                type='submit'
                className='search-button p-2'
            >
                SEARCH
            </Button>
        </Form>
    )
}

export default Search