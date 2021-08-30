import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import { isEmpty, startCase } from 'lodash-es';

import './react-datetime.css';

const CalendarFieldInput = ({
  id,
  name,
  value,
  placeholder,
  onChange,
  dateValidation,
  fromDate,
  className,
  initialViewMode = 'days',
  valid,
  readonly,
  error,
  required
}) => {
  valid = (current) => {
    let today = Datetime.moment.utc();
    let futuredates;

    if (dateValidation === 'pastdates') {
      const tomorrow = Datetime.moment.utc().add(0, 'day');
      return current.isBefore(tomorrow);
    } else if (dateValidation === 'futuredates') {
      return current.isAfter(today);
    } else if (dateValidation === 'fromtofuturedates') {
      const yesterday = Datetime.moment.utc(fromDate).add(-1, 'day');
      return current.isAfter(yesterday);
    } else {
      return null;
    }
  };

  const [focus, setFocus] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(error);

  const checkMandatory = () => {
    if (required && isEmpty(value)) {
      setErrorMsg(`${startCase(id)} field is required.`);
    }
  };

  return (
    <>
      <Datetime
        id={id}
        name={name}
        value={value}
        dateFormat='MM/DD/Y'
        timeFormat={false}
        closeOnSelect={true}
        closeOnTab={true}
        initialViewMode={initialViewMode}
        inputProps={{
          id: id,
          name: name,
          placeholder: placeholder,
          readOnly: readonly,
          className: `form-control-calendar ${className} ${
            focus ? 'react-select' : error ? 'err-txt-field' : 'form-control-border'
          }`
        }}
        isValidDate={valid}
        onChange={onChange}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
          checkMandatory();
        }}
      />
      {error && <div className='text-sm text-error py-2'>{error}</div>}
    </>
  );
};

CalendarFieldInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  dateValidation: PropTypes.string,
  fromDate: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  valid: PropTypes.bool,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  initialViewMode: PropTypes.string
};

export default CalendarFieldInput;
