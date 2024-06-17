import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useGetChannelDetailsQuery} from '../redux/config/channelConfig';
import {Card, Spinner, Container, Row, Col, Image, Tabs, Tab} from 'react-bootstrap';

const Channel = () => {

    const {id} = useParams();
    const {data, isLoading, isSuccess, isError} = useGetChannelDetailsQuery(id);

    const navigate = useNavigate();

    useEffect(() => {

        if(isError) {
            navigate('/');
        }

    }, [isError, navigate]);

    if(isLoading && !isSuccess) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <Spinner animation='border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </Spinner>
            </div>
        );
    }

    if(!data) {
        return null;
    }

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
        <Container>
                <Row>
                    <Col md={12}>
                        <Card className='mt-3'>
                            <Card.Img variant="top" src={data.backgroundImage} style={{height: '200px', objectFit: 'cover', width: '100%'}} />

                            <Card.Body>
                                
                                <div className='d-flex' id='channelInfo'>
                                    <div id='profileImage' className='me-3'>
                                        <Image src={data.profilePic} rounded width='100' height='100' />
                                    </div> 

                                    <div id='channelInfoDetails'>
                                        <h3>{data.name}</h3>

                                        <p>{data.userDetailsDTO.bio}</p>
                                    </div>
                                </div>

                                <Tabs
                                    defaultActiveKey="home"
                                    id="uncontrolled-tab-example"
                                    className="mb-3 mt-5"
                                    >
                                    <Tab eventKey="home" title="Home">
                                        Tab content for Home
                                    </Tab>
                                    <Tab eventKey="videos" title="Videos">
                                        Tab content for Videos
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
    </div>
  )
}

export default Channel