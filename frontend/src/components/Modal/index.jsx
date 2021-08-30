import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/FormFields/Button';
import './index.css';

const Modal = ({ title, message, onConfirm, modalActionNode, children }) => {
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!open);
  };

  const handleOnConfirm = () => {
    handleModal();
    onConfirm();
  };

  return (
    <>
      {open ? (
        <div>
          <div className='overlay'>
            <div className='confirmation-modal'>
              <div className='confirmation-modal-content text-center'>
                <h4>{title}</h4>
                <div className='mt-4 mb-3 confirmation-message'>{message}</div>
                {children && children}
                <div>
                  {onConfirm && (
                    <Button
                      type='button'
                      className='btn btn-light px-4 py-3 rounded'
                      value='OK'
                      onClick={handleOnConfirm}
                    />
                  )}
                </div>
                <div>
                  <Button
                    type='button'
                    className='btn btn-light px-4 py-3 rounded'
                    value='CLOSE'
                    onClick={handleModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span onClick={handleModal}>{modalActionNode}</span>
      )}
    </>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default Modal;
