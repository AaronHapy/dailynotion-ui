import React, {useRef} from 'react';
import {Modal, Button, Form, ProgressBar, Row, Col, Card} from 'react-bootstrap';
import { BsUpload } from "react-icons/bs";
import Video from '../utlis/videos/video.mp4';
import { Link } from 'react-router-dom';

const Upload = ({show, handleClose}) => {

    const fileInputRef = useRef(null);
    const fileThumbnailRef = useRef(null);

    const handleFile = () => {
        fileInputRef.current.click();
    }

    const handleFileThumbnail = () => {
        fileThumbnailRef.current.click();
    }

  return (
    <Modal size='xl' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            <ProgressBar className='mb-5' now={60} label={`${60}%`} />

            <Form>
                <Row>
                    <Col md={8}>

                        <h5 className='mb-3'>Details</h5>

                        <Form.Group className='mb-3'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={7} />
                        </Form.Group>

                        <h5 className='mt-3'>Thumbnail</h5>

                        <div className='d-flex mt-3 mb-5'>

                            <Form>
                                <Form.Group className='mb-3'>
                                    <Form.Control type="file" ref={fileThumbnailRef} style={{display: 'none'}} />
                                </Form.Group>
                            </Form>

                            <Card style={{ width: '18rem' }} onClick={handleFileThumbnail}>
                                <Card.Body className='text-center'>
                                    <Card.Title>Upload thumbnail</Card.Title>
                                    <Card.Text className='mt-4'>
                                        <BsUpload /> Upload file
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card style={{width: '18rem'}} className='ms-3'>
                                <Card.Img variant="top" src="https://dailynotion.s3.us-west-2.amazonaws.com/1718250013020_output.png" />
                            </Card>

                            <Card style={{width: '18rem'}} className='ms-3'>
                                <Card.Img variant="top" src="https://dailynotion.s3.us-west-2.amazonaws.com/1718250013020_output.png" />
                            </Card>

                        </div>
                    </Col>
                    <Col md={4}>
                        <video width='100%' controls>
                            <source src={Video} type='video/mp4' />
                        </video>

                        <Link to='/watch?v=qZWPXPovkGI'>FileName.mp4</Link>
                    </Col>
                </Row>
            </Form>

           {/* <Form className='text-center'>
                <Form.Group className='mb-3'>
                    <Form.Control type="file" ref={fileInputRef} style={{display: 'none'}} />
                </Form.Group>

                <Button variant='primary' onClick={handleFile}>SELECT FILES</Button>
           </Form> */}
        </Modal.Body>
    </Modal>
  )
}

export default Upload