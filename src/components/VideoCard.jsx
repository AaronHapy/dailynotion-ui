import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import {formatViews, timeAgo} from '../utlis/helpers';
import {Link} from 'react-router-dom';

const VideoCard = ({content}) => {      

  return (
    <Link to={`watch?v=${content.id}`} style={{textDecoration: 'none'}} >
        <Card style={{ width: '25rem', marginRight: '15px' }}>
        <Card.Img variant="top" src={content.thumbnail} />
        <Card.Body>
            <div className='d-flex justify-content-between'>
                {/* adding with and height to the image in order to maintains the same size regardless of the amount of content in the div */}
                <Image src={content.channelPic} rounded style={{ width: '50px', height: '50px' }} />

                <div className='w-75'>
                    <Card.Title style={{fontSize: '16px'}}>{content.title}</Card.Title>
                    <p>{content.channel}</p>

                    <span>{formatViews(content.views)}</span>
                    <span>{timeAgo(content.uploadedDate)}</span>
                </div>
            </div>
            
        </Card.Body>
        </Card>
    </Link>
  )
}

export default VideoCard