import React from 'react'
import { Form } from 'react-bootstrap'
import { isEmpty } from 'lodash-es'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TextComponent = (props) => {
  const {
    id,
    type,
    value,
    label,
    placeholder,
    onChange,
    validateField,
    required,
    disabled,
    readOnly,
    icon,
    iconPosition,
    maxLength,
    className,
    errorMsg
  } = props

  const [helperText, setHelperText] = React.useState(errorMsg)

  React.useEffect(() => {
    setHelperText(errorMsg)
  }, [errorMsg])

  const checkValidity = () => {
    if (validateField) {
      setHelperText(validateField({ [id]: value }).errors[id])
    }
  }

  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        onKeyUp={(event) => {
          if (event.keyCode !== 9) {
            checkValidity()
          }
        }}
        onBlur={() => {
          checkValidity()
        }}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        className={`${className} ${helperText ? 'err-txt-field' : 'form-control-border'}`}
        maxLength={maxLength}
      />
      {helperText && <p className='err-msg'>{helperText}</p>}
    </Form.Group>
  )
}

TextComponent.defaultProps = {
  placeholder: '',
  validateField: undefined,
  required: false,
  disabled: false,
  readOnly: false,
  icon: null,
  iconPosition: 'end',
  className: '',
  errorMsg: ''
}

export default TextComponent
