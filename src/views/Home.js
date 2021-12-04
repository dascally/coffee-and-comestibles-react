import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

import cafeWindowSeatImage from '../assets/cafe-window-seat.jpg';
import testimonialUser1Image from '../assets/testimonial-user-1.jpg';
import testimonialUser2Image from '../assets/testimonial-user-2.jpg';

export default function Home() {
  return (
    <>
      <Splash />
      <Container as='section' id='start-content'>
        <AboutUs />
      </Container>
      <Container as='section'>
        <Testimonials />
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

function Testimonials() {
  const TESTIMONIALS = [
    {
      name: 'Doloria Ipsum',
      photo: testimonialUser1Image,
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo esse iste, magnam explicabo enim impedit. Obcaecati autem minus iure esse, doloribus cum, dolorum reiciendis amet natus accusantium porro veritatis asperiores!',
    },
    {
      name: 'Dolor Voluptatem',
      photo: testimonialUser2Image,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quas aut iure tempore voluptates veritatis? Ad fugiat magnam enim veritatis, mollitia alias hic, incidunt quasi tempore iusto reprehenderit unde voluptatibus.',
    },
  ];

  return (
    <>
      <h2>What people are saying</h2>
      <Row xs={{ cols: 1 }} xl={{ cols: 2 }} className='g-4'>
        <Col>
          <TestimonialCard
            name={TESTIMONIALS[0].name}
            photo={TESTIMONIALS[0].photo}
            text={TESTIMONIALS[0].text}
          />
        </Col>
        <Col>
          <TestimonialCard
            name={TESTIMONIALS[1].name}
            photo={TESTIMONIALS[1].photo}
            text={TESTIMONIALS[1].text}
            smFlip
          />
        </Col>
      </Row>
    </>
  );
}

function TestimonialCard(props) {
  const { name, photo, text, smFlip } = props;

  // If smFlip is set, move photo to right of text at <xl viewports
  let classes = `
    d-flex
    align-items-center
    justify-content-center
    pt-3
    p-sm-1
    ${
      smFlip
        ? 'order-sm-last ' +
          'order-xl-first ' +
          'justify-content-sm-end ' +
          'justify-content-xl-start'
        : 'justify-content-sm-start'
    }
  `;

  return (
    <Card className='h-100'>
      <Row className='g-0 h-100'>
        <Col sm='auto' className={classes}>
          <img src={photo} alt='Customer' className='img-fluid rounded' />
        </Col>
        <Col sm className='d-flex align-items-center'>
          <Card.Body>
            <figure>
              <blockquote className='blockquote'>
                <p>{text}</p>
                <figcaption className='blockquote-footer'>{name}</figcaption>
              </blockquote>
            </figure>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
