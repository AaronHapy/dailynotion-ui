import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { formatNumber, timeAgo } from '../utlis/helpers';
import { Link } from 'react-router-dom';
import './VideoCard.css'; // Assuming you have a CSS file for styling

const VideoCard = ({ content, orderColumn }) => {
  const cardStyle = orderColumn === 'row' ? 'rowCard' : 'columnCard';
  const imageStyle = orderColumn === 'column' ? 'columnImage' : '';

  return (
    <Link to={`/watch?v=${content.id}`} className="cardLink">
      <Card className={`videoCard ${cardStyle}`}>
        <div className={`cardContent ${orderColumn === 'row' ? '' : 'd-flex'}`}>
          <Card.Img variant="top" src={content.thumbnail} className={imageStyle} />
          <Card.Body className={orderColumn === 'column' ? 'p-0' : ''}>
            <div className={`d-flex justify-content-between ${orderColumn === 'column' ? 'p-1' : ''}`}>
              {orderColumn === 'row' && <Image src={content.channelPic} rounded className="channelImage" />}
              <div className={`contentDetails ${orderColumn === 'row' ? 'w-75' : 'w-100'}`}>
                <Card.Title className={`title ${orderColumn === 'row' ? 'largeFont' : 'smallFont'}`}>{content.title}</Card.Title>
                <span className="channelName">{content.channel}</span> <br />
                <span className="views">{formatNumber(content.views)}</span> <span> - </span>
                <span className="uploadDate">{timeAgo(content.uploadedDate)}</span>
              </div>
            </div>
          </Card.Body>
        </div>
      </Card>
    </Link>
  );
};

// Define PropTypes for the VideoCard component
VideoCard.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    channelPic: PropTypes.string,
    title: PropTypes.string.isRequired,
    channel: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    uploadedDate: PropTypes.string.isRequired,
  }).isRequired,
  orderColumn: PropTypes.oneOf(['row', 'column']).isRequired,
};

export default VideoCard;
