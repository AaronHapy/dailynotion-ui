import React, {useEffect} from 'react';
import {Container, Row, Col, Card, ListGroup, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BsUpload } from 'react-icons/bs';
import {useSelector} from 'react-redux';
import {useUserHasChannelQuery} from '../redux/config/channelConfig'

const Studio = () => {

    const {isLoggedIn, userInfo} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const {data, isSuccess} = useUserHasChannelQuery(userInfo?.id);


    useEffect(() => {

        if(!isLoggedIn) {
            navigate('/');
        }
        else {
            if(isSuccess && data) {
                if(data.channelId === null || data.channelId === undefined) {
                    navigate('/');
                }
            }
        }

    }, [isLoggedIn, navigate, isSuccess, data]);

  return (
    <Container>

        <div className='d-flex align-items-center'>
            <h2 className='mt-3 me-4'>Channel Dashboard</h2>

            <Button as={Link} to='/studio/upload' variant='info'> <BsUpload /> Upload Video</Button>
        </div>

        <Row className='mt-5'>
            <Col md={4}>
            
            <Card>
                <Card.Body>
                    <Card.Title>Latest video</Card.Title>
                    <Card.Img className='mt-3 mb-3' variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1902df7a65a%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1902df7a65a%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.203125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                    <h6>How to easily kill a volatile in Dying Light 2</h6>
                </Card.Body>
            </Card>

            </Col>

            <Col md={4}>

            <Card>
                <Card.Body>
                    <Card.Title>Channel analytics</Card.Title>
                    <h6>Current subscribers</h6>
                    <p>12</p>
                </Card.Body>
            </Card>
            
            </Col>

            <Col md={4}>

                <Card className='mb-5'>
                    <Card.Body>
                        <Card.Title className='mb-3'>Creator Insider</Card.Title>
                        <Card.Img variant="top" src="https://www.gstatic.com/youtube/img/promos/growth/f546f544edda0ac3ec885950427751b0bebd9d98e3100c49d83a837b94384d12_1280x720.jpeg" />
                        <h4 className='mt-3 mb-3'>Dailynotion Liaison + Creator Journalist</h4>
                        <p className='text-muted'>A deep dive into news on YouTube with Johnny Harris</p>
                    </Card.Body>
                </Card>
            
                <Card>
                    <Card.Body>
                        <Card.Title>What's new in Studio</Card.Title>
                        
                        <ListGroup className='mt-4'>
                            <ListGroup.Item>Top community clips" shelf available now</ListGroup.Item>
                            <ListGroup.Item>Expansion of channel permissions</ListGroup.Item>
                            <ListGroup.Item>Upcoming changes to Community Guidelines warnings</ListGroup.Item>
                        </ListGroup>

                    </Card.Body>
                </Card>

            </Col>
        </Row>
    </Container>
  )
}

export default Studio