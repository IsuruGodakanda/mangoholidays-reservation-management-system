import React from 'react';
import ReactSelect from 'react-select';
import { isEmpty, lowerCase, startCase, startsWith } from 'lodash-es';

const Select = (props) => {
  const {
    id,
    name,
    placeholder,
    value,
    onChange,
    options,
    className,
    isMulti = false,
    closeMenuOnSelect,
    isSearchable = false,
    disabled = false,
    error,
    removeSearchIndicator = false,
    required
  } = props;

  const [filterOptions, setfilterOptions] = React.useState(options);
  const [focus, setFocus] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(error);

  const handleInputChange = (newValue) => {
    if (options) {
      setfilterOptions(options.filter((opt) => startsWith(lowerCase(opt.label), lowerCase(newValue))));
    }
  };

  const checkMandatory = () => {
    if (required && isEmpty(value)) {
      setErrorMsg(`${startCase(id)} field is required.`);
    }
  };

  const multiSelectStyles = {
    control: (base) => ({
      ...base,
      border: '0 !important',
      boxShadow: '0 !important',
      '&:hover': {
        border: '0 !important'
      },
      cursor: 'pointer',
      backgroundColor: '#f7f7f9',
      padding: '4px 26px'
    }),
    valueContainer: () => ({
      display: 'flex',
      flex: '1',
      flexWrap: 'wrap'
    }),
    option: (base) => ({
      ...base,
      cursor: 'pointer'
    }),
    singleValue: (base) => ({
      ...base,
      color: '#55595c',
      fontWeight: '400',
      letterSpacing: '0.08px',
      marginLeft: '-2px'
    }),
    multiValue: () => ({
      backgroundColor: '#F7DB1D',
      display: 'flex',
      margin: '2px'
    }),
    multiValueRemove: () => ({
      backgroundColor: '#F7DB1D',
      paddingLeft: '4px',
      paddingRight: '4px',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: '#ffb700'
      }
    }),
    input: () => ({
      height: '30px'
    }),
    placeholder: () => ({
      fontFamily: 'CircularBook, "Helvetica", sans-serif',
      letterSpacing: '0.5px',
      fontWeight: 'normal',
      fontSmoothing: 'antialiased',
      color: '#808EA5',
      position: 'absolute'
    })
  };

  React.useEffect(() => {
    handleInputChange('');
  }, [options]);

  return (
    <>
      <ReactSelect
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(selectedOption, event) => {
          onChange(selectedOption, event);
          setErrorMsg('');
        }}
        onInputChange={handleInputChange}
        options={filterOptions}
        className={`${className} ${focus ? 'react-select' : errorMsg ? 'err-txt-field' : 'form-control-border'}`}
        styles={multiSelectStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: '#9edbaf',
            primary: '#4bbf73'
          }
        })}
        isMulti={isMulti}
        closeMenuOnSelect={closeMenuOnSelect}
        isSearchable={isSearchable}
        isDisabled={disabled}
        tabSelectsValue={false}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
          checkMandatory();
        }}
        components={removeSearchIndicator && { DropdownIndicator: () => null, IndicatorSeparator: () => null }}
      />
      {errorMsg && <p className='err-msg'>{errorMsg}</p>}
    </>
  );
};

export default Select;
