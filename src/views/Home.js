import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

import cafeWindowSeatImage from '../assets/cafe-window-seat.jpg';

export default function Home() {
  return (
    <>
      <Splash />
      <Container as='section' id='start-content'>
        <AboutUs />
      </Container>
    </>
  );
}

function Splash() {
  return (
    <div className='splash d-flex flex-column align-items-center justify-content-end'>
      <hgroup className='w-100 text-center bg-light py-1 px-2 my-auto'>
        <h1 className='display-1'>Welcome to Coffee & Comestibles!</h1>
        <h2 className='display-6'>
          Your friendly neighborhood bakery and café
        </h2>
      </hgroup>
      <a href='#start-content' className='mb-5 position-absolute'>
        <FontAwesomeIcon icon={faChevronCircleDown} className='fs-1' />
      </a>
    </div>
  );
}

function AboutUs() {
  return (
    <>
      <h2>Who we are</h2>
      <Row className='g-1'>
        <Col md={7} lg={8}>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure modi
            voluptas beatae corporis quod sapiente hic doloremque perferendis,
            laboriosam totam aliquid facere ab inventore magni sit maxime vero
            alias tempore!
          </p>
        </Col>
        <Col md={5} lg={4} className='d-flex align-items-center'>
          <img
            src={cafeWindowSeatImage}
            alt='Small table in front of windows'
            className='img-fluid rounded'
          />
        </Col>
      </Row>
    </>
  );
}
