import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/FormFields/Button'
import './index.css'

const ConfirmationDialogBox = ({ message, onCancel, onConfirm }) => {
  return (
    <div>
      <div className='overlay'>
        <div className='confirmation-modal'>
          <div className='confirmation-modal-content text-center'>
            <div className='mt-4 mb-3 confirmation-message'>{message}</div>
            <div>
              <Button type='button' className='btn btn-light px-4 py-3 rounded' value='Leave' onClick={onConfirm} />
              {/* <button
                onClick={onConfirm}
                className='text-black font-bold text-xl px-4 py-3 rounded-full w-38 bg-btn-secondary hover:bg-btn-secondary-hover tracking-si-body3'
              >
                Leave
              </button> */}
            </div>
            <div>
              <Button
                type='button'
                className='btn btn-light px-4 py-3 rounded'
                value='Stay on page'
                onClick={onCancel}
              />
              {/* <button
                onClick={onCancel}
                className='text-black font-bold text-xl px-4 py-3 rounded-full w-38 bg-btn-tertiary hover:bg-btn-tertiary-hover mt-4 opacity-75 tracking-si-body3'
              >
                Stay on page
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ConfirmationDialogBox.propTypes = {
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}

export default ConfirmationDialogBox
