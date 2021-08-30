import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBox from '../SearchBox';
import { removeSession, SessionKey } from 'services/securityService';
import { setAuthUser } from 'redux/actions/AuthActions';

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, authUser } = auth;

  const logoutHandler = () => {
    removeSession([SessionKey.AUTH_TOKEN]);
    dispatch(setAuthUser());
  };

  return (
    <header>
      <Navbar className='bg-purple' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='text-light'>Mangoholidays</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              {isAuthenticated ? (
                <NavDropdown title={authUser.name} id='username'>
                  <LinkContainer to='/reservation'>
                    <NavDropdown.Item>Reservations</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/'>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className='text-light'>
                    <FontAwesomeIcon icon={['fas', 'user']} title='View user profile' size='lg' /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
