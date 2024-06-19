import React, {useEffect, useRef} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {formatNumber} from '../utlis/helpers';
import GridVideos from '../components/GridVideos';
import {useGetVideoDetailsQuery, useGetRandomVideosQuery, videoConfig} from '../redux/config/videoConfig';
import {useSelector, useDispatch} from 'react-redux'
import VideoPlayer from '../components/VideoPlayer';
import videojs from 'video.js';

const Watch = () => {

  const playerRef = useRef(null);

  const [searchParams] = useSearchParams();

  // get the query parameter value for v

  const titleUrl = searchParams.get('v');

  // const {data} = useGetVideoDetailsQuery(titleUrl);
  // const {data} = useGetRandomVideosQuery();

  const dispatch = useDispatch();
  const video = useSelector((state) => state.video);

  const videoJSOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fuild: true,
    sources: [{
      src: video?.video?.path,
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
  
  useEffect(() => {

    dispatch(videoConfig.endpoints.getVideoDetails.initiate(titleUrl));
    dispatch(videoConfig.endpoints.getRandomVideos.initiate());

  }, [dispatch, titleUrl]);

  return (
    <Container className='mt-5'>

      {video.isSuccess && Object.keys(video.video).length > 0 && (
        <Row>
          <Col md={8}>
            
            <VideoPlayer options={videoJSOptions} onReady={handlePlayerReady} />

            <h2 className='mt-3'>{video?.video?.title}</h2>

            <div className='d-flex mt-4'>
                <div className='d-flex'>
                    <div className='d-flex'>
                        <img src={video?.video?.channelDTO?.profilePic} className='rounded' width='40' height='40' alt='description' />
                        <div className='d-flex flex-column ms-2 me-2'>
                          <span>
                            <Link to={`/channel/${video?.video?.channelDTO?.id}`}>{video?.video?.channelDTO?.name}</Link>
                          </span>
                          {/* <span><b>{formatNumber(videoData.channelSubscribersCount)}</b> subscribers</span> */}
                        </div>
                    </div>

                    <Button variant='dark'>Subscribe</Button>
                </div>
            </div>

            <div className='mt-5 bg-light pt-3 ps-3 pb-3' style={{borderRadius: '10px'}}>
              <span><b>{formatNumber(video?.video?.views)} views  {video?.video?.uploadedDate}</b></span>
              <p>{video?.video?.description}</p>
            </div>

          </Col>
          <Col md={4}>
            <GridVideos videos={video?.videos} orderColumn='column' />
          </Col>
        </Row>
      )}

    </Container>
  )
}

export default Watch