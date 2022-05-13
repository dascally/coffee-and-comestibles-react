import { useDispatch, useSelector } from 'react-redux';
import { changeItemQuantity } from '../features/order/orderSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import {
  Row,
  Col,
  Button,
  Card,
  Image,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';

function MenuItemCard({ id }) {
  const dispatch = useDispatch();
  const { name, description, image, allergens, price, options } = useSelector(
    (state) => state.menu.find((menuItem) => id === menuItem._id)
  );

  const handleAddToBasket = () => {
    dispatch(changeItemQuantity({ id, quantityChange: 1 }));
  };

  return (
    <Card className='g-0 card-menu-item'>
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
                      {allergens.length === 0
                        ? ''
                        : allergens.reduce(
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
                >
                  <FontAwesomeIcon icon={faInfo} className='mx-2' />
                </Button>
              </OverlayTrigger>
            </div>
            <Card.Text>{description}</Card.Text>
            <Button
              type='button'
              variant='primary'
              className='d-block ms-auto'
              onClick={handleAddToBasket}
            >
              Add 1 to basket
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default MenuItemCard;
