import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import {useRegisterUserMutation} from '../redux/config/authConfig';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setToast} from '../redux/slices/toastSlice';

const Register = () => {

    const [form, setForm] = useState({
       username: '',
       password: '',
       email: '',
       fullName: '',
       bio: '' 
    });

    const [file, setFile] = useState(null);

    const [registerUser, {isSuccess, isError}] = useRegisterUserMutation();
    const {isLoggedIn} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleChange = (e) => {
        e.preventDefault();

        const {name, value} = e.target;

        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('userData', JSON.stringify(form));

        if(file) {
            formData.append('image', file);
        }

        // Send data into the server

        try{

            const response = await registerUser(formData);

            if(response.data) {
                navigate('/login');
                dispatch(setToast({message: response.data, type: 'success'}));
            }

        }catch(error) {
            dispatch(setToast({message: error.message, type: 'error'}));
        }


        setForm({
            username: '',
            password: '',
            email: '',
            fullName: '',
            bio: '' 
        });

        setFile(null);
    }

    useEffect(() => {

        if(isLoggedIn) navigate('/');

    }, [isLoggedIn]);

  return (
    <Container>
        <Row>
            <Col md={12}>
                <Card className='mt-5'>
                    <Card.Title className='text-center mt-3 mb-3'>Register</Card.Title>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>

                            <Form.Group controlId="Image" className="mb-3">
                                <Form.Label>Select your profilePic (Optional)</Form.Label>
                                <Form.Control type="file" onChange={handleFileChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" onChange={handleChange} name='username' value={form.username} placeholder="Enter username" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" onChange={handleChange} name='email' value={form.email} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="fullName">
                                <Form.Label>fullName</Form.Label>
                                <Form.Control type="text" onChange={handleChange} name='fullName' value={form.fullName} placeholder="Enter fullName" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="bio">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control as="textarea" name='bio' onChange={handleChange} value={form.bio} rows={3} placeholder='Enter your bio' />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={handleChange} name='password' value={form.password} placeholder="Password" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Register
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default Register