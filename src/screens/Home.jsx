import React from 'react';
import {fixtures} from '../utlis/mocks/mock'
import Header from '../components/Header';
import VideoCard from '../components/VideoCard';

const Home = () => {
  return (
    <div className='m-3 d-flex flex-wrap'>
        {fixtures && fixtures.length > 0 && fixtures.map((content, index) => (
            <VideoCard key={index} content={content} />
        ))}
    </div>
  )
}

export default Home