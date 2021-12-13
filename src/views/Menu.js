import { useState } from 'react';
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
import menuData from '../assets/menu-data.js';

function MenuItemCard({
  name,
  description,
  image,
  allergens,
  handleAddToBasket,
}) {
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
              onClick={() => {
                handleAddToBasket(name, image, allergens, 1);
              }}
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
  // TODO: Refactor. Maybe have a setQuantity function for adding or removing.
  //       If item is added but not in the list already, call an initItem
  //       function that adds it, looking up needed data from menu data object.

  const [purchaseList, setPurchaseList] = useState([]);

  function addToBasket(name, image, allergens, quantity) {
    const existingItemIndex = purchaseList.findIndex(
      (item) => item.name === name
    );
    if (existingItemIndex === -1) {
      setPurchaseList(
        purchaseList.concat({
          name,
          image,
          allergens,
          quantity,
        })
      );
    } else {
      const newPurchaseList = purchaseList.slice();
      newPurchaseList.splice(existingItemIndex, 1, {
        ...newPurchaseList[existingItemIndex],
        quantity: newPurchaseList[existingItemIndex].quantity + quantity,
      });
      setPurchaseList(newPurchaseList);
    }
  }

  function removeFromBasket(name, quantity) {
    const itemIndex = purchaseList.findIndex((item) => item.name === name);
    if (itemIndex === -1) return;

    const newPurchaseList = purchaseList.slice();
    if (quantity >= newPurchaseList[itemIndex].quantity) {
      newPurchaseList.splice(itemIndex, 1);
      setPurchaseList(newPurchaseList);
    } else {
      newPurchaseList.splice(itemIndex, 1, {
        ...newPurchaseList[itemIndex],
        quantity: newPurchaseList[itemIndex].quantity - quantity,
      });
      setPurchaseList(newPurchaseList);
    }
  }

  return (
    <>
      <ShoppingBasket
        purchaseList={purchaseList}
        handleRemoveFromBasket={removeFromBasket}
      />
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
                        <Col key={item.name}>
                          <MenuItemCard
                            name={item.name}
                            description={item.description}
                            image={item.image}
                            allergens={item.allergens}
                            handleAddToBasket={addToBasket}
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
