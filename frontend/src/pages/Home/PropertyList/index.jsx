import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import PropertyItem from './PropertyItem';
import PropertyCarousel from './PropertyCarousel';
import Meta from 'components/Meta';
import Pagination from 'components/Pagination';
import { setLoaderStatus } from 'redux/actions//GlobalActions';
import { listProperties } from 'services/api/propertyApi';

const PropertyListScreen = () => {
  const global = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [properties, setProperties] = useState([]);
  const [serverError, setServerError] = useState('');
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadHandler = () => {
      listProperties({ offset: page, limit: pageSize, search_term: global.keyword })
        .then((res) => {
          dispatch(setLoaderStatus(false));
          setProperties(res.results);
          setCount(res.totalCount);
        })
        .catch((err) => {
          dispatch(setLoaderStatus(false));
          setServerError(JSON.parse(err.message).message);
        });
    };

    loadHandler();
  }, [dispatch, global.keyword, page]);

  return (
    <>
      <Meta title='Property List' />
      {!global.keyword && <PropertyCarousel />}
      <h1>Latest Properties</h1>
      {properties && <Pagination total={count} pageSize={pageSize} paginate={setPage} current={page} />}
      <Row className='pt-3'>
        {properties.map((property) => (
          <Col key={property._id} sm={12} md={6} lg={4} xl={3}>
            <PropertyItem property={property} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default PropertyListScreen;
