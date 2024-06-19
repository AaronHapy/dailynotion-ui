import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Dropdown, Image } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../redux/slices/authSlice';
import { BsPerson, BsFillHouseDoorFill, BsGear, BsBoxArrowRight } from 'react-icons/bs';
import {useUserHasChannelQuery} from '../redux/config/channelConfig';

const Header = () => {

  const {isLoggedIn, userInfo} = useSelector((state) => state.auth);
  const {isSuccess, data} = useUserHasChannelQuery(userInfo?.id || -1);
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
          <Form className="d-flex justify-content-center">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
          <Nav className='me-5 pe-5'>

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

            {isLoggedIn && userInfo && (
              <>
                <Dropdown drop='down'>
                  <Dropdown.Toggle variant="dark">
                    <Image src={userInfo.profilePicture} width='30' height='30' rounded />
                  </Dropdown.Toggle>
            
                  <Dropdown.Menu>
                    {isSuccess && data && data.channelExists === true ? (
                      <>
                        <LinkContainer to={`/channel/${data.channelId}`}>
                        <Dropdown.Item> 
                          <BsPerson /> Your Channel
                        </Dropdown.Item>
                        </LinkContainer>

                        <LinkContainer to={`/studio`}>
                        <Dropdown.Item> 
                          <BsFillHouseDoorFill /> Studio
                        </Dropdown.Item>
                        </LinkContainer>
                      </>
                    ) : (
                      <LinkContainer to={`/create/channel`}>
                      <Dropdown.Item> 
                        <BsPerson /> Create Channel
                      </Dropdown.Item>
                    </LinkContainer>
                    )}
                    
                    <Dropdown.Item onClick={logout}> <BsBoxArrowRight /> Logout</Dropdown.Item>
                    <Dropdown.Divider />

                    <LinkContainer to='/settings'>
                      <Dropdown.Item> 
                        <BsGear /> Settings
                      </Dropdown.Item>
                    </LinkContainer>
                    
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header