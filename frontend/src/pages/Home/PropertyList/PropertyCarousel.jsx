import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { FormattedNumber } from 'react-intl';
import { setLoaderStatus } from 'redux/actions//GlobalActions';
import { listProperties } from 'services/api/propertyApi';
import { sunRoom, seaRoom, hillsRoom } from 'utils/imageUtil';

const PropertyCarousel = () => {
  const dispatch = useDispatch();
  const [properties, setProperties] = useState([]);
  const [serverError, setServerError] = useState('');

  const loadHandler = () => {
    listProperties({ offset: 1, limit: 3, sortby: 'rating', sortdirection: 'DESC' })
      .then((res) => {
        dispatch(setLoaderStatus(false));
        setProperties(res.results);
      })
      .catch((err) => {
        dispatch(setLoaderStatus(false));
        setServerError(JSON.parse(err.message).message);
      });
  };

  const setImage = (key) => {
    if (key === 'sun') {
      return sunRoom;
    } else if (key === 'sea') {
      return seaRoom;
    } else {
      return hillsRoom;
    }
  };

  useEffect(() => {
    loadHandler();
  }, []);

  return (
    <Carousel pause='hover' className='bg-purple'>
      {properties.map((property) => (
        <Carousel.Item key={property._id}>
          <Link to={`/property/${property._id}`}>
            <Image src={setImage(property.image)} alt={property.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {property.name} ({<FormattedNumber value={0} style='currency' currency='LKR' />})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PropertyCarousel;
