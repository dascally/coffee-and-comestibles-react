import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import MenuItemCard from '../features/menu/MenuItemCard.js';
import ShoppingBasket from '../features/order/ShoppingBasket.js';

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

    const newMenuItem = { ...menuItem };
    delete newMenuItem.menuSection;
    section.items.push(newMenuItem);
  });

  structuredMenuData.sort((a, b) => {
    // Reversing this makes it convenient to order names not in this list at
    // the end
    const order = [
      'Hot drinks',
      'Cold drinks',
      'Baked savory',
      'Baked sweets',
    ].reverse();

    const aOrdinal = order.indexOf(a.sectionName);
    const bOrdinal = order.indexOf(b.sectionName);

    return bOrdinal - aOrdinal;
  });

  return structuredMenuData;
};

export default function Menu() {
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
                          <MenuItemCard id={item._id} />
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
