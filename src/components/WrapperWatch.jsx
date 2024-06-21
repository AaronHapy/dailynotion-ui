import React from 'react';
import {useSearchParams} from 'react-router-dom';
import Watch from '../screens/Watch'

const WrapperWatch = () => {

    const [searchParams] = useSearchParams();
    const videoTitle = searchParams.get('v');

  return (
    <Watch key={videoTitle} />
  )
}

export default WrapperWatch