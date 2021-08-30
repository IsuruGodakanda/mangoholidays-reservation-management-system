import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { searchProducts } from 'redux/actions/GlobalActions'
import './index.css'

const SearchBox = ({ history }) => {
  const global = useSelector((state) => state.global)
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState(global.keyword)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(searchProducts(keyword))
    history.push('/')
  }

  const clearSearchHandler = () => {
    setKeyword('')
    dispatch(searchProducts(''))
    history.push('/')
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      />
      {keyword && (
        <FontAwesomeIcon
          onClick={clearSearchHandler}
          icon={['fas', 'times']}
          title='Clear'
          size='sm'
          className='input-clear'
        />
      )}
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
