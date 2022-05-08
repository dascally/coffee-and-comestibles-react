import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeItemQuantity } from '../features/order/orderSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import {
  Container,
  Row,
  Col,
  Button,
  Accordion,
  Card,
  Image,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import ShoppingBasket from '../components/ShoppingBasket.js';
import { fetchMenu } from '../features/menu/menuSlice.js';
import menuData from '../assets/menu-data.js';

function MenuItemCard({ name, description, image, allergens, onAddToBasket }) {
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
              onClick={onAddToBasket}
            >
              Add 1 to basket
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default function Menu() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  return (
    <>
      <ShoppingBasket menu={menuData} />
      <Container as='section'>
        <h1>Menu / Order Online</h1>
        <Accordion defaultActiveKey={menuData[0].sectionName}>
          {menuData.map((section) => {
            return (
              <Accordion.Item
                eventKey={section.sectionName}
                key={section.sectionName}
              >
                <Accordion.Header>{section.sectionName}</Accordion.Header>
                <Accordion.Body>
                  <Row xs={{ cols: 1 }} lg={{ cols: 2 }} className='g-3'>
                    {section.items.map((item) => {
                      return (
                        <Col key={item.id}>
                          <MenuItemCard
                            name={item.name}
                            description={item.description}
                            image={item.image}
                            allergens={item.allergens}
                            onAddToBasket={() => {
                              dispatch(
                                changeItemQuantity({
                                  id: item.id,
                                  quantityChange: 1,
                                })
                              );
                            }}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Container>
    </>
  );
}
