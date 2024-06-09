import React from 'react';
import {fixtures} from '../utlis/mocks/mock'
import Header from '../components/Header';

const Home = () => {
  return (
    <div>
        {fixtures && fixtures.length > 0 && fixtures.map((item, index) => (
            <div key={index}>{item.title}</div>
        ))}
    </div>
  )
}

export default Home