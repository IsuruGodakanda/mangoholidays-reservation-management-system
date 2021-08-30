import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

const Rating = ({ rating, numReviews, color }) => {
  return (
    <div className='rating'>
      <span>
        <FontAwesomeIcon
          icon={rating >= 1 ? ['fas', 'star'] : rating >= 0.5 ? ['fas', 'star-half-alt'] : ['far', 'star']}
          title='Rating'
          size='sm'
          color={color}
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={rating >= 2 ? ['fas', 'star'] : rating >= 1.5 ? ['fas', 'star-half-alt'] : ['far', 'star']}
          title='Rating'
          size='sm'
          color={color}
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={rating >= 3 ? ['fas', 'star'] : rating >= 2.5 ? ['fas', 'star-half-alt'] : ['far', 'star']}
          title='Rating'
          size='sm'
          color={color}
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={rating >= 4 ? ['fas', 'star'] : rating >= 3.5 ? ['fas', 'star-half-alt'] : ['far', 'star']}
          title='Rating'
          size='sm'
          color={color}
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={rating >= 5 ? ['fas', 'star'] : rating >= 4.5 ? ['fas', 'star-half-alt'] : ['far', 'star']}
          title='Rating'
          size='sm'
          color={color}
        />
      </span>
      <span>{numReviews ? `${numReviews} reviews` : ''}</span>
    </div>
  )
}

Rating.defaultProps = {
  rating: 0,
  color: '#f8e825'
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  numReviews: PropTypes.number,
  color: PropTypes.string
}

export default Rating
