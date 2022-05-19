import { useDispatch, useSelector } from 'react-redux';
import { removeItem, selectOrderItemById } from './orderSlice';
import { selectMenuItemById } from '../menu/menuSlice';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';

function ShoppingBasketItemCard({ orderItemId, ...props }) {
  const dispatch = useDispatch();

  const orderItem = useSelector(selectOrderItemById(orderItemId));
  const menuItemId = orderItem.menuItem;
  const { name, image, price } = useSelector(selectMenuItemById(menuItemId));

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
              <Card.Title as='h4' className='mb-1'>
                {name}
              </Card.Title>
              <Button
                className='
                  text-primary
                  menu-item-info
                  py-1 px-2
                  position-absolute
                  end-0
                  top-0
                  mt-n1 me-n1
                '
                onClick={() => dispatch(removeItem(orderItemId))}
              >
                ✗
              </Button>
            </div>
            <Card.Text className='fs-6 mb-1'>
              {(price / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Card.Text>
            {Object.keys(orderItem.selectedOptions).length ? (
              <>
                <Card.Text className='mb-0'>Selected options:</Card.Text>
                <ul>
                  {Object.entries(orderItem.selectedOptions).map(
                    ([option, selectedValue]) => (
                      <li key={option}>
                        {option}: {selectedValue}
                      </li>
                    )
                  )}
                </ul>
              </>
            ) : null}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default ShoppingBasketItemCard;
