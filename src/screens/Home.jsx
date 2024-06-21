import React, {useEffect} from 'react';
import GridVideos from '../components/GridVideos';
import {videoConfig} from '../redux/config/videoConfig';
import {useSelector, useDispatch} from 'react-redux';
import {Alert, Spinner} from 'react-bootstrap'

const Home = () => {

  const dispatch = useDispatch();
  const video = useSelector((state) => state.video);

  useEffect(() => {

    dispatch(videoConfig.endpoints.getRandomVideos.initiate());

  }, []);

  return (
    <div>

      {video.loading && (
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
      )}

      {video.isSuccess && video.videos.length > 0 ? (
        <GridVideos videos={video.videos} orderColumn='row' />
      ) : (
        <Alert variant='info'>There is no videos to show</Alert>
      )}
    </div>
  )
}

export default Home