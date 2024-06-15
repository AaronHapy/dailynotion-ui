import React from 'react';
import { Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../redux/slices/authSlice'

const Header = () => {

  const {isLoggedIn} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(logoutUser())
    window.location.reload();
  }

  return (
    <Navbar bg="dark" expand="lg" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>Dailynotion</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
          <Nav>

            {!isLoggedIn && (
              <>
                <LinkContainer to='/login'>
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/register'>
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}

            {isLoggedIn && (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            )}

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header