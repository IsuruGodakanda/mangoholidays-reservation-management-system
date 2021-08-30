import React from 'react'
import { Button } from 'react-bootstrap'

const ButtonComponent = (props) => {
  const { id, type, value, onClick, disabled, className, variant = 'primary' } = props

  return (
    <Button id={id} type={type} variant={variant} className={className} disabled={disabled} onClick={onClick}>
      {value}
    </Button>
  )
}

ButtonComponent.defaultProps = {
  disabled: false,
  className: '',
  variant: 'primary'
}

export default ButtonComponent
