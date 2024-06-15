import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {fixtures} from '../utlis/mocks/mock'
import Video from '../utlis/videos/video.mp4';
import {formatNumber} from '../utlis/helpers';
import GridVideos from '../components/GridVideos';

const Watch = () => {

  const [searchParams] = useSearchParams();

  // get the query parameter value for v

  const value = searchParams.get('v');

  const videoData = fixtures.find(video => video.id === value);

  

  return (
    <Container className='mt-5'>

      <Row>
        <Col md={8}>
          
          <video width='100%' controls>
              <source src={Video} type='video/mp4' />
          </video>

          <h2>{videoData.title}</h2>

          <div className='d-flex mt-4'>
              <div className='d-flex'>
                  <div className='d-flex'>
                      <img src={videoData.channelPic} className='rounded' width='40' height='40' alt='description' />
                      <div className='d-flex flex-column ms-2 me-2'>
                        <span>{videoData.channel}</span>
                        <span><b>{formatNumber(videoData.channelSubscribersCount)}</b> subscribers</span>
                      </div>
                  </div>

                  <Button variant='dark'>Subscribe</Button>
              </div>
          </div>

          <div className='mt-5 bg-light pt-3 ps-3 pb-3' style={{borderRadius: '10px'}}>
            <span><b>{formatNumber(videoData.views)} views  {videoData.uploadedDate}</b></span>
            <p>{videoData.description}</p>
          </div>

        </Col>
        <Col md={4}>
          <GridVideos videos={fixtures} orderColumn='column' />
        </Col>
      </Row>

    </Container>
  )
}

export default Watch