import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Offcanvas } from 'react-bootstrap';
import ShoppingBasketItemCard from './ShoppingBasketItemCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

function PurchaseList() {
  const orderList = useSelector((state) => state.order);

  return (
    <>
      {orderList.map((orderItem) => (
        <Row key={orderItem.id}>
          <Col>
            <ShoppingBasketItemCard
              orderItemId={orderItem.id}
              className='mb-2'
            />
          </Col>
        </Row>
      ))}
    </>
  );
}

export default function ShoppingBasket() {
  const [show, setShow] = useState(false);

  function handleToggle() {
    setShow(!show);
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
        <Offcanvas.Body>
          <PurchaseList />
          <div className='d-flex justify-content-center mt-2'>
            <Link to='/checkout.html' className='btn btn-primary'>
              Go to checkout
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
