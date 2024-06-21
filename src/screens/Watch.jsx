import React, {useRef} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {formatNumber} from '../utlis/helpers';
import GridVideos from '../components/GridVideos';
import {useGetVideoDetailsQuery, useGetRandomVideosQuery} from '../redux/config/videoConfig';
import VideoPlayer from '../components/VideoPlayer';
import videojs from 'video.js';

const Watch = () => {

  const playerRef = useRef(null);

  const [searchParams] = useSearchParams();

  // get the query parameter value for v

  const titleUrl = searchParams.get('v');

  const {data, isSuccess} = useGetVideoDetailsQuery(titleUrl);
  const {data: randomVideos, isSuccess: success} = useGetRandomVideosQuery();

  const videoJSOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fuild: true,
    sources: [{
      src: data?.path,
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  }
  
  return (
    <Container className='mt-5' fluid>

      {isSuccess && Object.keys(data).length > 0 && (
        <Row>
          <Col md={8}>
            
            <VideoPlayer options={videoJSOptions} onReady={handlePlayerReady} />

            <h2 className='mt-3'>{data?.title}</h2>

            <div className='d-flex mt-4'>
                <div className='d-flex'>
                    <div className='d-flex'>
                        <img src={data?.channelDTO?.profilePic} className='rounded' width='40' height='40' alt='description' />
                        <div className='d-flex flex-column ms-2 me-2'>
                          <span>
                            <Link to={`/channel/${data?.channelDTO?.id}`}>{data?.channelDTO?.name}</Link>
                          </span>
                          {/* <span><b>{formatNumber(videoData.channelSubscribersCount)}</b> subscribers</span> */}
                        </div>
                    </div>

                    <Button variant='dark'>Subscribe</Button>
                </div>
            </div>

            <div className='mt-5 bg-light pt-3 ps-3 pb-3' style={{borderRadius: '10px'}}>
              <span><b>{formatNumber(data?.views)} views  {data?.uploadedDate}</b></span>
              <p>{data?.description}</p>
            </div>

          </Col>
          <Col md={4}>
            {success && (
              <GridVideos videos={randomVideos} orderColumn='column' />
            )}
          </Col>
        </Row>
      )}

    </Container>
  )
}

export default Watch