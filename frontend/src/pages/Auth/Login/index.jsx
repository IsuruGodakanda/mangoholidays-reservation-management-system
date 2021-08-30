import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Container, Image } from 'react-bootstrap';
import Text from 'components/FormFields/Text';
import Button from 'components/FormFields/Button';
import { useDispatch } from 'react-redux';
import Message from 'components/Message';
import Meta from 'components/Meta';
import { SessionKey, setSession } from 'services/securityService';
import { setAuthUser } from 'redux/actions/AuthActions';
import { setLoaderStatus } from 'redux/actions//GlobalActions';
import { loginImg } from 'utils/imageUtil';
import { login } from 'services/api/authApi';
import validateForm from './validateForm';
import './index.css';

const LoginScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const [errors] = React.useState({
    email: '',
    password: ''
  });
  const [disabledForm, setDisabledForm] = React.useState(true);
  const [serverError, setServerError] = useState('');

  const { email, password } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
    setServerError('');
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(setLoaderStatus(true));

    login({ email, password })
      .then((res) => {
        const authToken = res.token;
        setSession({ [SessionKey.AUTH_TOKEN]: authToken });
        dispatch(setAuthUser());
        dispatch(setLoaderStatus(false));
      })
      .catch((err) => {
        dispatch(setLoaderStatus(false));
        setServerError(JSON.parse(err.message).message);
      });
  };

  useEffect(() => {
    const activeSubmitButton = () => {
      if (validateForm(formData).isValid) {
        setDisabledForm(false);
      } else {
        setDisabledForm(true);
      }
    };

    activeSubmitButton();
  }, [formData]);

  useEffect(() => {
    return () => {
      setSession({ [SessionKey.REDIRECT_PATH]: '' });
    };
  }, []);

  return (
    <>
      <Meta title='Login' />
      <section className='login-form my-4'>
        <Container>
          <Row className='login-card' noGutters>
            <Col lg={5}>
              <Image src={loginImg} className='login-img' alt='login-image' fluid />
            </Col>
            <Col lg={7} className='px-5 pt-5'>
              <Link to='/' alt='home'>
                <h1 className='font-weight-bold py-3'>Mangoholidays</h1>
              </Link>
              <h4>Sign into your account</h4>
              {serverError && <Message variant='danger'>{serverError}</Message>}
              <Form onSubmit={submitHandler}>
                <Form.Row>
                  <Col lg={7}>
                    <Text
                      id='email'
                      label='Email Address*'
                      type='text'
                      placeholder='sample@mail.com'
                      value={email}
                      onChange={handleChange}
                      validateField={validateForm}
                      errorMsg={errors.email}
                      required
                    />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col lg={7}>
                    <Text
                      id='password'
                      label='Password*'
                      type='password'
                      placeholder='********'
                      value={password}
                      onChange={handleChange}
                      validateField={validateForm}
                      errorMsg={errors.password}
                      required
                    />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col lg={7}>
                    <Button
                      type='submit'
                      value='Sign In'
                      variant='primary'
                      className='login-btn my-3'
                      disabled={disabledForm}
                    />
                  </Col>
                </Form.Row>
              </Form>

              <Row className='py-3'>
                <Col>
                  New Customer? <Link to={'/signup'}>Register</Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default LoginScreen;
