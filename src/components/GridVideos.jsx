import React from 'react';
import VideoCard from './VideoCard';

const GridVideos = ({videos, orderColumn}) => {
  return (
    <div className={`m-3 d-flex flex-wrap flex-${orderColumn}`}>
        {videos && videos.length > 0 && videos.map((content, index) => (
            <VideoCard key={index} content={content} orderColumn={orderColumn} />
        ))}
    </div>
  )
}

export default GridVideos