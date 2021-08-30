import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedNumber } from 'react-intl';
import { filter } from 'lodash-es';
import Rating from 'components/Rating';
import Message from 'components/Message';
import Select from 'components/FormFields/Select';
import Calendar from 'components/FormFields/Calendar';
import Meta from 'components/Meta';
import { RatingLevels } from 'utils/listUtil';
import { generateListOptionsByNumner, generateListOptionsByDataObject } from 'utils/commonUtil';
import { setLoaderStatus } from 'redux/actions/GlobalActions';
import { getProperty, getPropertyAvailability } from 'services/api/propertyApi';
import { addReservation } from 'services/api/reservationApi';
import { listRoomBoards } from 'services/api/roomBoardApi';
import { listRoomSizes } from 'services/api/roomSizeApi';
import { getRoomRate } from 'services/api/roomRateApi';
import { setSession, SessionKey } from 'services/securityService';
import { sunRoom, seaRoom, hillsRoom } from 'utils/imageUtil';

const PropertyScreen = ({ history, match, location }) => {
  const propertyId = match.params.id;
  const dispatch = useDispatch();
  const [property, setProperty] = useState(null);
  const [roomQty, setRoomQty] = useState(1);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [roomBoard, setRoomBoard] = useState();
  const [roomBoards, setRoomBoards] = useState(null);
  const [roomSize, setRoomSize] = useState();
  const [roomSizes, setRoomSizes] = useState(null);
  const [price, setPrice] = useState(0);
  const [comment, setComment] = useState('');
  const [serverError, setServerError] = useState('');
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated } = auth;
  const ratingLevelOptions = RatingLevels.options;

  const loadHandler = () => {
    getProperty(propertyId)
      .then((res) => {
        dispatch(setLoaderStatus(false));
        setProperty(res);
      })
      .catch((err) => {
        dispatch(setLoaderStatus(false));
        setServerError(JSON.parse(err.message).message);
      });

    getPropertyAvailability(propertyId, { from_date: fromDate, to_date: toDate })
      .then((res) => {
        dispatch(setLoaderStatus(false));
        setAvailableRooms(res.availableRooms);
      })
      .catch((err) => {
        dispatch(setLoaderStatus(false));
        setServerError(JSON.parse(err.message).message);
      });

    listRoomBoards()
      .then((res) => {
        dispatch(setLoaderStatus(false));
        setRoomBoards(generateListOptionsByDataObject(res.results, 'type', '_id'));
      })
      .catch((err) => {
        dispatch(setLoaderStatus(false));
        setServerError(JSON.parse(err.message).message);
      });

    listRoomSizes()
      .then((res) => {
        dispatch(setLoaderStatus(false));
        setRoomSizes(generateListOptionsByDataObject(res.results, 'type', '_id'));
      })
      .catch((err) => {
        dispatch(setLoaderStatus(false));
        setServerError(JSON.parse(err.message).message);
      });
  };

  const makeReservation = () => {
    if (isAuthenticated) {
      const payload = {
        reserved_property: propertyId,
        number_of_rooms: roomQty,
        room_board_type: roomBoard,
        room_size_type: roomSize,
        from_date: fromDate,
        to_date: toDate,
        total_price: price
      };

      addReservation(payload)
        .then((res) => {
          dispatch(setLoaderStatus(false));
          history.push('/reservation');
        })
        .catch((err) => {
          dispatch(setLoaderStatus(false));
          setServerError(JSON.parse(err.message).message);
        });
    } else {
      history.push('/login');
      setSession({ [SessionKey.REDIRECT_PATH]: location.pathname });
    }
  };

  const handleSelectChange = (selectedOption, event) => {
    if (event.name === 'roomBoard') {
      setRoomBoard(selectedOption.value);
      if (roomSize) {
        loadRoomRate(selectedOption.value, roomSize);
      }
    } else if (event.name === 'roomSize') {
      setRoomSize(selectedOption.value);
      loadRoomRate(roomBoard, selectedOption.value);
    } else if (event.name === 'room') {
      setRoomQty(selectedOption.value);
    }
  };

  const handleFromDateChange = (event) => {
    setFromDate(event);
    setToDate(event);
    setServerError('');
  };

  const handleToDateChange = (event) => {
    setToDate(event);
    setServerError('');
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

  const loadRoomRate = (board, size) => {
    getRoomRate(board, size)
      .then((res) => {
        dispatch(setLoaderStatus(false));
        setPrice(res.rate);
      })
      .catch((err) => {
        dispatch(setLoaderStatus(false));
        setServerError(JSON.parse(err.message).message);
      });
  };

  useEffect(() => {
    loadHandler();
  }, [dispatch, propertyId]);

  useEffect(() => {
    getPropertyAvailability(propertyId, { from_date: fromDate, to_date: toDate })
      .then((res) => {
        dispatch(setLoaderStatus(false));
        setAvailableRooms(res.availableRooms);
      })
      .catch((err) => {
        dispatch(setLoaderStatus(false));
        setServerError(JSON.parse(err.message).message);
      });
  }, [toDate]);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {property && (
        <>
          <Meta title={`Property | ${match.params.id}`} />
          <Row>
            <Col md={6}>
              <Image src={setImage(property.image)} alt={property.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{property.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating rating={property.rating} numReviews={property.numReviews}></Rating>
                </ListGroup.Item>
                <ListGroup.Item>Price: {<FormattedNumber value={0} style='currency' currency='LKR' />}</ListGroup.Item>
                <ListGroup.Item>Description: ${property.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{<FormattedNumber value={price} style='currency' currency='LKR' />}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{availableRooms > 0 ? 'Available' : 'Reserved'}</Col>
                    </Row>
                  </ListGroup.Item>

                  {availableRooms > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Rooms Qty</Col>
                        <Col>
                          <Select
                            id='roomQty'
                            name='roomQty'
                            placeholder='Set number of rooms*'
                            value={filter(generateListOptionsByNumner(availableRooms), ['value', roomQty])}
                            onChange={handleSelectChange}
                            options={generateListOptionsByNumner(availableRooms)}
                            closeMenuOnSelect
                            isSearchable
                            error=''
                            removeSearchIndicator
                            required
                          />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={makeReservation}
                      className='btn-block'
                      type='button'
                      disabled={availableRooms === 0 || !price}
                    >
                      Make Reservation
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <Form onSubmit={makeReservation}>
                <Form.Group controlId='fromDate'>
                  <Form.Label>From Date</Form.Label>
                  <Calendar
                    id='fromDate'
                    name='fromDate'
                    placeholder='Select from date'
                    containerStyle='flex flex-row w-full sm:w-full fadedIcon'
                    readonly={true}
                    // initialViewMode={dob ? 'days' : 'years'}
                    dateValidation='futuredates'
                    onChange={handleFromDateChange}
                    value={fromDate}
                  />
                </Form.Group>
                <Form.Group controlId='toDate'>
                  <Form.Label>To Date</Form.Label>
                  <Calendar
                    id='toDate'
                    name='toDate'
                    placeholder='Select to date'
                    containerStyle='flex flex-row w-full sm:w-full fadedIcon'
                    readonly={true}
                    // initialViewMode={dob ? 'days' : 'years'}
                    dateValidation='fromtofuturedates'
                    fromDate={fromDate}
                    onChange={handleToDateChange}
                    value={toDate}
                  />
                </Form.Group>
                {roomBoards && (
                  <Form.Group controlId='roomBoard'>
                    <Form.Label>Boarding Types</Form.Label>
                    <Select
                      id='roomBoard'
                      name='roomBoard'
                      placeholder='Select boarding type*'
                      value={filter(roomBoards, ['value', roomBoard])}
                      onChange={handleSelectChange}
                      options={roomBoards}
                      className=''
                      isMulti={false}
                      closeMenuOnSelect
                      isSearchable={false}
                      disabled={false}
                      error=''
                      required
                    />
                  </Form.Group>
                )}
                {roomSizes && roomBoard && (
                  <Form.Group controlId='roomSize'>
                    <Form.Label>Number of Guests</Form.Label>
                    <Select
                      id='roomSize'
                      name='roomSize'
                      placeholder='Select number of guests*'
                      value={filter(roomSizes, ['value', roomSize])}
                      onChange={handleSelectChange}
                      options={roomSizes}
                      className=''
                      isMulti={false}
                      closeMenuOnSelect
                      isSearchable={false}
                      disabled={false}
                      error=''
                      required
                    />
                  </Form.Group>
                )}
              </Form>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default PropertyScreen;
