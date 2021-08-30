import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import validateForm from './validateForm'

const PasswordRulesBox = ({ password }) => {
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors(validateForm({ password }).errors)
  }, [password])

  return (
    <>
      <span className='font-weight-bold pl-3 text-lg-left'>Passwords must:</span>
      <ul className='list-group text-lg-left pl-3 py-2'>
        <li className='mb-1'>
          <span className='mr-2'>
            {errors.lowerAlphaValidation ? (
              <FontAwesomeIcon icon={['fas', 'times-circle']} color={'red'} title='error' size='sm' />
            ) : (
              <FontAwesomeIcon icon={['fas', 'check-circle']} color={'green'} title='correct' size='sm' />
            )}
          </span>
          <span>Have at least one lower case letter</span>
        </li>
        <li className='mb-1'>
          <span className='mr-2'>
            {errors.upperAlphaValidation ? (
              <FontAwesomeIcon icon={['fas', 'times-circle']} color={'red'} title='error' size='sm' />
            ) : (
              <FontAwesomeIcon icon={['fas', 'check-circle']} color={'green'} title='correct' size='sm' />
            )}
          </span>
          <span>Have at least one capital letter</span>
        </li>
        <li className='mb-1'>
          <span className='mr-2'>
            {errors.numberValidation ? (
              <FontAwesomeIcon icon={['fas', 'times-circle']} color={'red'} title='error' size='sm' />
            ) : (
              <FontAwesomeIcon icon={['fas', 'check-circle']} color={'green'} title='correct' size='sm' />
            )}
          </span>
          <span>Have at least one number</span>
        </li>
        <li className='mb-1'>
          <span className='mr-2'>
            {errors.lengthValidation ? (
              <FontAwesomeIcon icon={['fas', 'times-circle']} color={'red'} title='error' size='sm' />
            ) : (
              <FontAwesomeIcon icon={['fas', 'check-circle']} color={'green'} title='correct' size='sm' />
            )}
          </span>
          <span>Be at least 8 characters</span>
        </li>
      </ul>
    </>
  )
}

export default PasswordRulesBox
