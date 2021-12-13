import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import {
  Row,
  Col,
  Button,
  Offcanvas,
  Card,
  Image,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';

function ShoppingBasketItemCard({
  name,
  image,
  allergens,
  quantity,
  handleRemoveFromBasket,
}) {
  return (
    <Card className='g-0 card-shopping-basket-item'>
      <Row className='g-0'>
        <Col sm='auto'>
          <Image
            src={image.src}
            alt={image.alt}
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
              <Card.Title as='h4'>{name}</Card.Title>
              <OverlayTrigger
                trigger='click'
                rootClose
                overlay={
                  <Popover className='shadow-sm'>
                    <h4 className='popover-header fs-6'>Allergen Info</h4>
                    <Popover.Body>
                      Contains:{' '}
                      {allergens.reduce(
                        (list, allergen) => `${list}, ${allergen}`
                      )}
                    </Popover.Body>
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
                  onClick={() => handleRemoveFromBasket(name, Infinity)}
                >
                  ✗
                </Button>
              </OverlayTrigger>
            </div>
            <Card.Text>{`Quantity: ${quantity}`}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

function PurchaseList({ contents, handleRemoveFromBasket }) {
  return (
    <>
      {contents.map((menuItem) => (
        <Row key={menuItem.name}>
          <Col>
            <ShoppingBasketItemCard
              name={menuItem.name}
              image={menuItem.image}
              allergens={menuItem.allergens}
              quantity={menuItem.quantity}
              handleRemoveFromBasket={handleRemoveFromBasket}
            />
          </Col>
        </Row>
      ))}
    </>
  );
}

export default function ShoppingBasket({
  purchaseList,
  handleRemoveFromBasket,
}) {
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
        <Offcanvas.Body>
          <PurchaseList
            contents={purchaseList}
            handleRemoveFromBasket={handleRemoveFromBasket}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
