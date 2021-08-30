import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Container, Image } from 'react-bootstrap';
import Text from 'components/FormFields/Text';
import Button from 'components/FormFields/Button';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Message from 'components/Message';
import Meta from 'components/Meta';
import { setAuthUser } from 'redux/actions/AuthActions';
import { setLoaderStatus } from 'redux/actions//GlobalActions';
import { signUpImg } from 'utils/imageUtil';
import { signUp } from 'services/api/authApi';
import validateForm from './validateForm';
import PasswordRulesBox from './PasswordRulesBox';
import { SessionKey, setSession } from 'services/securityService';
import './index.css';

const SignUpScreen = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [disabledForm, setDisabledForm] = useState(true);
  const [serverError, setServerError] = useState('');

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
    setServerError('');
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(setLoaderStatus(true));

    signUp({ name, email, password })
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

  return (
    <>
      <Meta title='Sign Up' />
      <section className='sign-up-form my-4'>
        <Container>
          <Row className='sign-up-card' noGutters>
            <Col lg={5}>
              <Image src={signUpImg} className='sign-up-img' alt='sign-up-image' fluid />
            </Col>
            <Col lg={7} className='px-5 pt-5'>
              <Link to='/' alt='home'>
                <h1 className='font-weight-bold py-3'>Mangoholidays</h1>
              </Link>
              <h4>Create your account</h4>
              {serverError && <Message variant='danger'>{serverError}</Message>}
              <Form onSubmit={submitHandler}>
                <Form.Row>
                  <Col lg={7}>
                    <Text
                      id='name'
                      label='Full Name*'
                      type='text'
                      placeholder='Johm Doe'
                      value={name}
                      onChange={handleChange}
                      validateField={validateForm}
                      errorMsg={errors.name}
                      required
                    />
                  </Col>
                </Form.Row>
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
                    <PasswordRulesBox password={password} />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col lg={7}>
                    <Text
                      id='confirmPassword'
                      label='Confirm Password*'
                      type='password'
                      placeholder='********'
                      value={confirmPassword}
                      onChange={handleChange}
                      validateField={validateForm}
                      errorMsg={errors.confirmPassword}
                      required
                    />
                  </Col>
                </Form.Row>
                <Form.Row></Form.Row>
                <Form.Row>
                  <Col lg={7}>
                    <Button
                      type='submit'
                      value='Sign Up'
                      variant='primary'
                      className='sign-up-btn my-3'
                      disabled={disabledForm}
                    />
                  </Col>
                </Form.Row>
              </Form>

              <Row>
                <Col>
                  Have an Account? <Link to={'/login'}>Login</Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SignUpScreen;
