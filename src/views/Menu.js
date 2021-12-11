import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faInfo } from '@fortawesome/free-solid-svg-icons';
import {
  Container,
  Row,
  Col,
  Button,
  Offcanvas,
  Accordion,
  Card,
  Image,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import latteImage from '../assets/latte-1.jpg';

function ShoppingBasket() {
  const [show, setShow] = useState(false);

  function handleToggle() {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  }
  function handleClose() {
    setShow(false);
  }

  return (
    <>
      <Button
        variant='outline-primary'
        className='rounded-circle p-2 position-absolute top-0 end-0 mt-n1'
        onClick={handleToggle}
      >
        <FontAwesomeIcon icon={faShoppingBag} className='fs-3 mx-1' />
      </Button>
      <Offcanvas
        show={show}
        placement='end'
        backdrop={false}
        scroll={true}
        className='shadow'
      >
        <Offcanvas.Header closeButton={true} onHide={handleClose}>
          <Offcanvas.Title as='h4'>Shopping Basket</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>Placeholder text</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default function Menu() {
  return (
    <>
      <ShoppingBasket />
      <Container as='section'>
        <h1>Menu / Order Online</h1>
        <Accordion defaultActiveKey='hot-drinks'>
          <Accordion.Item eventKey='hot-drinks'>
            <Accordion.Header>Hot drinks</Accordion.Header>
            <Accordion.Body>
              <Row xs={{ cols: 1 }} lg={{ cols: 2 }} className='g-3'>
                <Col>
                  <Card className='g-0 card-menu-item'>
                    <Row className='g-0'>
                      <Col sm='auto'>
                        <Image
                          src={latteImage}
                          alt='A latte in a mug'
                          rounded
                          className='
                            rounded-sm-0 rounded-start-sm
                            d-block
                            mx-auto
                            mt-2 mt-sm-0
                          '
                        />
                      </Col>
                      <Col sm>
                        <Card.Body>
                          <div className='position-relative'>
                            <Card.Title as='h4'>Banana bread latte</Card.Title>
                            <OverlayTrigger
                              trigger='click'
                              rootClose
                              overlay={
                                <Popover className='shadow-sm'>
                                  <h4 className='popover-header fs-6'>
                                    Allergen Info
                                  </h4>
                                  <Popover.Body>Contains: soy</Popover.Body>
                                </Popover>
                              }
                            >
                              <Button
                                className='
                                text-primary
                                menu-item-info
                                p-1
                                position-absolute
                                end-0
                                top-0
                                mt-n1 me-n1
                              '
                              >
                                <FontAwesomeIcon
                                  icon={faInfo}
                                  className='mx-2'
                                />
                              </Button>
                            </OverlayTrigger>
                          </div>
                          <Card.Text>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Perferendis laborum sit esse quam, nemo,
                            doloribus reiciendis laudantium expedita soluta
                            fugiat dolorum officia illum? Enim doloribus
                            provident similique deleniti quia dolore.
                          </Card.Text>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='cold-drinks'>
            <Accordion.Header>Cold drinks</Accordion.Header>
            <Accordion.Body>placeholder</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='baked-savory'>
            <Accordion.Header>Baked savory</Accordion.Header>
            <Accordion.Body>placeholder</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='baked-sweets'>
            <Accordion.Header>Baked sweets</Accordion.Header>
            <Accordion.Body>placeholder</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
}
