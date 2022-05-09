import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeItemQuantity } from '../features/order/orderSlice.js';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import MenuItemCard from '../components/MenuItemCard.js';
import ShoppingBasket from '../components/ShoppingBasket.js';

const structureMenuData = (flatMenuData) => {
  const structuredMenuData = [];
  flatMenuData.forEach((menuItem) => {
    const sectionName = menuItem.menuSection;
    let section = structuredMenuData.find(
      (section) => section.sectionName === sectionName
    );
    if (!section) {
      section = { sectionName, items: [] };
      structuredMenuData.push(section);
    }

    const newMenuItem = { ...menuItem, image: { ...menuItem.image } };
    newMenuItem.image.src = `${process.env.PUBLIC_URL}/menu/${newMenuItem.image.src}`;
    delete newMenuItem.menuSection;

    section.items.push(newMenuItem);
  });
  return structuredMenuData;
};

export default function Menu() {
  const dispatch = useDispatch();

  const flatMenuData = useSelector((state) => state.menu);
  const menu = useMemo(() => structureMenuData(flatMenuData), [flatMenuData]);

  return (
    <>
      <ShoppingBasket menu={menu} />
      <Container as='section'>
        <h1>Menu / Order Online</h1>
        <Accordion defaultActiveKey={menu[0]?.sectionName}>
          {menu.map((section) => {
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
                        <Col key={item._id}>
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
