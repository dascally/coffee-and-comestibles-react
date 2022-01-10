import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeItem,
  selectOrderItemQuantity,
} from '../features/order/orderSlice.js';
import { Link } from 'react-router-dom';
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

function getMenuItemByID(id, menu) {
  const flatMenu = menu.flatMap((section) => section.items);

  const menuItem = flatMenu.find((menuItem) => menuItem.id === id);

  if (menuItem === undefined) {
    throw new Error(`Menu item with ID ${id} not found.`);
  } else {
    return menuItem;
  }
}

function ShoppingBasketItemCard({ menuItemID, menu, ...props }) {
  const dispatch = useDispatch();
  const { name, image, allergens } = getMenuItemByID(menuItemID, menu);
  const quantity = useSelector(selectOrderItemQuantity(menuItemID));

  let cardClasses = 'g-0 card-shopping-basket-item';
  if (props.className) {
    cardClasses += ' ' + props.className;
  }

  return (
    <Card className={cardClasses}>
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
                      Contains: {allergens.join(', ')}
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
                  onClick={() => dispatch(removeItem(menuItemID))}
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

function PurchaseList({ menu }) {
  const orderList = useSelector((state) => state.order);

  return (
    <>
      {orderList.map((menuItem) => (
        <Row key={menuItem.id}>
          <Col>
            <ShoppingBasketItemCard
              menuItemID={menuItem.id}
              menu={menu}
              className='mb-2'
            />
          </Col>
        </Row>
      ))}
    </>
  );
}

export default function ShoppingBasket({ menu }) {
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
          <PurchaseList menu={menu} />
          <div className='d-flex justify-content-center mt-2'>
            <Link
              to='/order-confirmation.html'
              className='btn btn-primary'
              // onClick={() => handleRemoveFromBasket('*', Infinity)}
            >
              Place your order
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
