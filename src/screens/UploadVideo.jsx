import React, {useEffect, useState} from 'react';
import {Button, Form, ProgressBar, Container, Row, Col, Card, Spinner} from 'react-bootstrap';
import axios from 'axios';
import {useCreateVideoMutation} from '../redux/config/videoConfig';
import {useUserHasChannelQuery} from '../redux/config/channelConfig';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setToast} from '../redux/slices/toastSlice'

const UploadVideo = () => {

  const [progress, setProgress] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);

  const [form, setForm] = useState({
    title: '',
    path: '',
    description: ''
  });

  const {isLoggedIn, userInfo} = useSelector((state) => state.auth);
  const {loading} = useSelector((state) => state.video);

  const [createVideo] = useCreateVideoMutation();
  const {data, isSuccess} = useUserHasChannelQuery(userInfo?.id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUploadVideoChange = async (e) => {
    
    if(e.target.files && e.target.files.length > 0) {
  
      try{
  
        const formData = new FormData();
        formData.append("video", e.target.files[0]);

  
        const response = await axios.post(
          '/api/videos/upload/video',
          formData,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setProgress(percentCompleted);
            }
          }
        );
  
        setProgress(0);

        setForm(prevForm => ({
          ...prevForm,
          path: response.data
        }));

        dispatch(setToast({message: 'Video was upload successfully', type: 'success'}))
  
      }catch(error) {
        dispatch(setToast({ message: error?.response?.data , type: 'error'}));
        setProgress(0);
      }

    }

    

  }

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
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
    formData.append("videoDetails", JSON.stringify(form));

    if(thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
   
    try {
      const response = await createVideo({ formData, channelId: data?.channelId }).unwrap();

      if(response) {
          dispatch(setToast({message: 'Video was created successfully', type: 'success'}))
          setForm({
            title: '',
            path: '',
            description: ''
          });

          setThumbnail(null);
          navigate(`/watch?v=${response.titleUrl}`);
      }
      
  } catch (error) {
      // Handle error
      console.error('Error creating channel:', error);
  }

  }

  useEffect(() => {

    if(!isLoggedIn) {
      navigate('/')
    }
    else {
      if(isSuccess && data) {
        if(data.channelId === null || data.channelId === undefined) {
            navigate('/');
        }
    }
    }

  }, [isLoggedIn, isSuccess, navigate, data]);

  return (
    <Container>

        <h4 className='mt-3 mb-5'>Upload your Video!</h4>

        <Row>
          <Col md={12}>

          <ProgressBar className='mb-5' now={progress} label={`${progress}%`} />

          <Card>

              {loading && (
                  <Spinner animation='border' role='status' className='m-3'>
                      <span className='visually-hidden'>Loading...</span>
                  </Spinner>
              )}

            <Card.Body>

              <Form onSubmit={handleSubmit}>
                  <Form.Group className='mb-4'>
                      <Form.Label htmlFor="uploadVideo">Choose the video to upload (Required)</Form.Label>
                      <Form.Control id='uploadVideo' type="file" onChange={handleUploadVideoChange} />
                  </Form.Group>

                  <Form.Group className='mb-4'>
                      <Form.Label htmlFor="thumbnail">Choose the image for your video thumbnail (Optional)</Form.Label>
                      <Form.Control id='thumbnail' type="file" onChange={handleThumbnailChange} />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name='title' value={form.title} placeholder="Enter the title of your video" />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={handleChange} name='description' value={form.description} placeholder='Enter the description of your video' />
                  </Form.Group>

                  {form.title !== '' && form.description !== '' && form.path !== '' && (
                      <Button type='submit' variant='primary'>Upload</Button>
                  )}

              </Form>

            </Card.Body>
          </Card>

          </Col>
        </Row>
    </Container>
  )
}

export default UploadVideo