import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Button, Form, Spinner } from 'react-bootstrap';
import { useLoginUserMutation, authConfig } from '../redux/config/authConfig';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setToast} from '../redux/slices/toastSlice'

const Login = () => {
    const [usernameorEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginUser] = useLoginUserMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isLoggedIn, loading} = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Let's add some validation
        if(usernameorEmail === '' || password === '') {
            dispatch(setToast({message: 'Input fields cannot be blank', type:'error'}))
            return;
        }

        const userCredentials = { usernameorEmail, password };

        try {
            const result = await loginUser(userCredentials).unwrap();
            if (result.accessToken) {
                dispatch(authConfig.endpoints.userDetails.initiate());
                dispatch(setToast({message: 'You logged in successfully', type: 'success'}))
            }

        } catch (error) {
            dispatch(setToast({message: error?.data?.message, type: 'error'}))
        }

        setUsernameOrEmail('');
        setPassword('');
    };

    useEffect(() => {
        if(isLoggedIn) navigate('/');

    }, [isLoggedIn, navigate]);

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <Card className='mt-5'>
                        {loading && (
                            <Spinner animation='border' role='status' className='m-3'>
                                <span className='visually-hidden'>Loading...</span>
                            </Spinner>
                        )}
                        <Card.Title className='text-center mt-3 mb-3'>Login</Card.Title>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email or username</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setUsernameOrEmail(e.target.value)} value={usernameorEmail} placeholder="Enter username or email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
