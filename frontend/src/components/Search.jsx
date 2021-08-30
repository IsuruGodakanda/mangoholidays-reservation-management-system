import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('')

  const onInputChange = (value) => {
    setSearch(value)
    onSearch(value)
  }
  return (
    <div class='input-group rounded mb-2'>
      <input
        type='search'
        className='form-control form-control-border'
        placeholder='Search'
        aria-label='Search'
        aria-describedby='search-addon'
        onChange={(e) => onInputChange(e.target.value)}
        value={search}
      />
      <span className='input-group-text border-0' id='search-addon'>
        <FontAwesomeIcon icon={['fas', 'search']} title='Search' size='sm' />
      </span>
    </div>
  )
}

export default Search
