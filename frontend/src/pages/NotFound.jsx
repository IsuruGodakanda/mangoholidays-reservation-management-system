import React from 'react'
import Button from 'components/FormFields/Button'

const NotFound = ({ history }) => {
  const goBackHandler = () => {
    history.goBack()
  }

  return (
    <div className='center'>
      <div className='page-wrap d-flex flex-row align-items-center'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-12 text-center'>
              <span className='display-1 d-block'>404</span>
              <div className='mb-4 lead'>The page you are looking for was not found.</div>
              <Button type='button' onClick={goBackHandler} className='btn btn-light' value='Go Back' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
