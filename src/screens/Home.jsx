import React from 'react';
import GridVideos from '../components/GridVideos';
import {useGetRandomVideosQuery} from '../redux/config/videoConfig';
import {useSelector} from 'react-redux';
import {Alert} from 'react-bootstrap'

const Home = () => {

  const {data} = useGetRandomVideosQuery();

  const video = useSelector((state) => state.video);

  return (
    <div>
      {video.isSuccess && video.videos.length > 0 ? (
        <GridVideos videos={video.videos} orderColumn='row' />
      ) : (
        <Alert variant='info'>There is no videos to show</Alert>
      )}
    </div>
  )
}

export default Home