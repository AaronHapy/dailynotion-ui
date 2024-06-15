import React from 'react';
import {fixtures} from '../utlis/mocks/mock'
import GridVideos from '../components/GridVideos';

const Home = () => {
  return (
    <GridVideos videos={fixtures} orderColumn='row' />
  )
}

export default Home