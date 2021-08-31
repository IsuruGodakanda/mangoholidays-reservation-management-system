import React, { useState, useEffect } from 'react';
import { Table, Button, Col, Row, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from 'lodash-es';
import { toast } from 'react-toastify';
import { FormattedNumber } from 'react-intl';
import Pagination from 'components/Pagination';
import Message from 'components/Message';
import Loader from 'components/Loader';
import Search from 'components/Search';
import Meta from 'components/Meta';
import Modal from 'components/Modal';
import Select from 'components/FormFields/Select';
import { PaymentOptions } from 'utils/listUtil';
import { getAuthReservations, cancelReservation, setPaymentMethod } from 'services/api/reservationApi';
import { setLoaderStatus } from 'redux/actions/GlobalActions';

const MyReservationsTable = ({ history }) => {
  const [reservations, setReservations] = useState([]);
  const [serverError, setServerError] = useState('');
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [payMethod, setPayMethod] = useState('CASH_LOCATION');
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const paymentMethodOptions = PaymentOptions.options;

  const dispatch = useDispatch();

  const loadHandler = () => {
    dispatch(setLoaderStatus(true));

    getAuthReservations({ offset: page, limit: pageSize, search_term: search })
      .then((res) => {
        dispatch(setLoaderStatus(false));
        setReservations(res.results);
        setCount(res.totalCount);
      })
      .catch((err) => {
        dispatch(setLoaderStatus(false));
        history.push('/');
        toast.error(JSON.parse(err.message).message);
      });
  };

  const cancelHandler = (id) => {
    dispatch(setLoaderStatus(true));

    cancelReservation(id)
      .then((res) => {
        dispatch(setLoaderStatus(false));
        toast.success(res.message);
        loadHandler();
      })
      .catch((err) => {
        dispatch(setLoaderStatus(false));
        history.push('/');
        toast.error(JSON.parse(err.message).message);
      });
  };

  const paymentMethodHandler = (id, payload) => {
    dispatch(setLoaderStatus(true));

    setPaymentMethod(id, payload)
      .then((res) => {
        dispatch(setLoaderStatus(false));
        loadHandler();
      })
      .catch((err) => {
        dispatch(setLoaderStatus(false));
        history.push('/');
        toast.error(JSON.parse(err.message).message);
      });
  };

  const handleSelectChange = (selectedOption, event) => {
    if (event.name === 'payMethod') {
      setPayMethod(selectedOption.value);
    }
  };

  useEffect(() => {
    loadHandler();
  }, [page, search]);

  return (
    <>
      <Meta title='Reservations' />
      <Row>
        <Col md={12}>
          <Search
            onSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />
          {loadingReservations ? (
            <Loader />
          ) : serverError ? (
            <Message variant='danger'>{serverError}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>REF NO.</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation._id}>
                    <td>{reservation.reservation_ref_id}</td>
                    <td>{reservation.createdAt.substring(0, 10)}</td>
                    <td>
                      <FormattedNumber value={reservation.total_price} style='currency' currency='LKR' />
                    </td>
                    <td>{reservation.is_paid ? reservation.paid_at.substring(0, 10) : 'N/A'}</td>
                    <td>{reservation.is_delivered ? reservation.delivered_at.substring(0, 10) : 'N/A'}</td>
                    {reservation.payment_result ? (
                      reservation.payment_result.status !== 'PAYMENT_CANCELLED' ? (
                        <td>
                          <Modal
                            title='Confirm Cancellation'
                            message='Are you sure you want to cancel this reservation?'
                            onConfirm={() => cancelHandler(reservation._id)}
                            modalActionNode={
                              <Button className='btn-sm' variant='danger'>
                                Cancel
                              </Button>
                            }
                          />
                        </td>
                      ) : (
                        'CANCELLED'
                      )
                    ) : (
                      <td>
                        <Modal
                          title='Select payment method'
                          message=''
                          onConfirm={() => paymentMethodHandler(reservation._id, { payment_method: payMethod })}
                          modalActionNode={
                            <Button className='btn-sm' variant='light'>
                              Select payment method
                            </Button>
                          }
                        >
                          <Form.Group controlId='payMethod'>
                            <Form.Label>Payment Method</Form.Label>
                            <Select
                              id='payMethod'
                              name='payMethod'
                              placeholder='Please select payment method*'
                              value={filter(paymentMethodOptions, ['value', payMethod])}
                              onChange={handleSelectChange}
                              options={paymentMethodOptions}
                              className=''
                              isMulti={false}
                              closeMenuOnSelect
                              isSearchable={false}
                              disabled={false}
                              error=''
                              required
                            />
                          </Form.Group>
                        </Modal>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {reservations && <Pagination total={count} pageSize={pageSize} paginate={setPage} current={page} />}
        </Col>
      </Row>
    </>
  );
};

export default MyReservationsTable;
