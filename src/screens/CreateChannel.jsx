import React, {useEffect, useState} from 'react';
import {useUserHasChannelQuery} from '../redux/config/channelConfig';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Container, Row, Col, Card, Form, Button, Spinner} from 'react-bootstrap';
import {useCreateChannelMutation} from '../redux/config/channelConfig';
import { setToast } from '../redux/slices/toastSlice';

const CreateChannel = () => {

    const [profileImage, setProfileImage] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [name, setName] = useState('');

    const maxLength = 20; // Maximum allowed length for the channel name

    const handleChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= maxLength) {
            setName(inputValue);
        }
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [createChannel, {isLoading}] = useCreateChannelMutation();

    const {isLoggedIn, userInfo} = useSelector((state) => state.auth);

    const {data} = useUserHasChannelQuery(userInfo?.id);

    const handleProfileImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    }

    const handleBackgroundImageChange = (e) => {
        setBackgroundImage(e.target.files[0]);
    }

    const validateChannelName = (name) => {
        if(name === '') {
            
            // send a toast notificaton
            console.log('the name of the channel cannot be empty');
            return false;

        }
        else if(name.length < 5 || name.length > 20) {
            // send a toast notificaton
            console.log('Error: The name of the channel must be between 5 and 20 characters long')

            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        if(validateChannelName(name)) {

            // send data to the server

            if(profileImage) {
                formData.append("profileImage", profileImage);
            }

            if(backgroundImage) {
                formData.append("backgroundImage", backgroundImage);
            }


            formData.append("channelData", JSON.stringify({name}));

            try {
                const response = await createChannel({ formData, userId: userInfo?.id });
    
                if(response.data) {
                    navigate('/');
                    dispatch(setToast({message: response.data, type: 'success'}));
                }
                
            } catch (error) {
                // Handle error
                console.error('Error creating channel:', error.error);
                dispatch(setToast({message: 'Error creating channel', type: 'error'}))
            }

            
        }

    }

    useEffect(() => {

        if(!isLoggedIn) {
            navigate('/');
        }
        else if(isLoggedIn && data && data.channelExists) {
            navigate('/');
        }

    }, [isLoggedIn, data, navigate]);

  return (
    <Container>
            <Row>
                <Col md={12}>
                    <Card className='mt-5'>

                    {isLoading && (
                        <Spinner animation='border' role='status' className='m-3'>
                            <span className='visually-hidden'>Loading...</span>
                        </Spinner>
                    )}


                        <Card.Title className='text-center mt-3 mb-3'>Create your channel</Card.Title>
                        <Card.Body>

                            <p className='text-muted mt-1 mb-5 text-center'>We are so excited for you to create a channel, so you can start commenting on videos and, 
                                of course, uploading videos for free!</p>

                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="Image" className="mb-5">
                                    <Form.Label>Select the profile picture of your channel (Optional)</Form.Label>
                                    <Form.Control type="file" onChange={handleProfileImageChange} />
                                </Form.Group>

                                <Form.Group controlId="Image" className="mb-5">
                                <Form.Label>Select the background image of your channel (Optional)</Form.Label>
                                <Form.Control type="file" onChange={handleBackgroundImageChange} />
                            </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name of your channel</Form.Label>
                                    <div style={{ position: 'relative' }}>
                                        <Form.Control 
                                            type="text" 
                                            onChange={handleChange} 
                                            value={name} 
                                            maxLength={maxLength} // Limit the input length
                                            placeholder="Name of your channel" 
                                        />
                                        <div 
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '10px',
                                                transform: 'translateY(-50%)',
                                                color: 'gray',
                                                fontSize: '12px'
                                            }}
                                        >
                                            {name.length}/{maxLength}
                                        </div>
                                    </div>
                                        
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Create channel
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
  )
}

export default CreateChannel