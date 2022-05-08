import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeItemQuantity } from '../features/order/orderSlice.js';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import MenuItemCard from '../components/MenuItemCard.js';
import ShoppingBasket from '../components/ShoppingBasket.js';
import { fetchMenu } from '../features/menu/menuSlice.js';
import menuData from '../assets/menu-data.js';

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
