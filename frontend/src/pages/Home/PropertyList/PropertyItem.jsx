import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FormattedNumber } from 'react-intl';
import Rating from 'components/Rating';
import { sunRoom, seaRoom, hillsRoom } from 'utils/imageUtil';

const setImage = (key) => {
  if (key === 'sun') {
    return sunRoom;
  } else if (key === 'sea') {
    return seaRoom;
  } else {
    return hillsRoom;
  }
};

const Property = ({ property }) => {
  return (
    <Card className='my-3 p-3 rounded zoom h-90'>
      <Link to={`/property/${property._id}`}>
        <Card.Img src={setImage(property.image)} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/property/${property._id}`}>
          <Card.Title as='div'>
            <strong>{property.name}</strong>
          </Card.Title>
        </Link>
        numReviews
        <Card.Text as='div'>
          <Rating rating={property.rating} numReviews={property.numReviews}></Rating>
        </Card.Text>
        <Card.Text as='h4'>
          <FormattedNumber value={0} style='currency' currency='LKR' />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Property;
