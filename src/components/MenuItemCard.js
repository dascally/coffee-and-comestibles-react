import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/order/orderSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Card,
  CloseButton,
  Col,
  Dropdown,
  Image,
  OverlayTrigger,
  Popover,
  Row,
} from 'react-bootstrap';

function MenuItemCard({ id }) {
  const dispatch = useDispatch();
  const { name, description, image, allergens, price, options } = useSelector(
    (state) => state.menu.find((menuItem) => id === menuItem._id)
  );
  const [unselectedOptions, setUnselectedOptions] = useState(options.slice());
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Selected options have the shape:
  // { name: String, suboptions: [String], selected: String }
  const handleAddOptionClick = (evt) => {
    const optionName = evt.target.textContent;
    if (selectedOptions.find((option) => option.name === optionName)) return;

    const newOption = {
      ...options.find((option) => option.name === optionName),
    };
    newOption.selected = newOption.suboptions[0];
    setSelectedOptions(selectedOptions.concat(newOption));

    setUnselectedOptions(
      unselectedOptions.filter((option) => option.name !== optionName)
    );
  };

  const removeOption = (optionName) => {
    setSelectedOptions(
      selectedOptions.filter((option) => option.name !== optionName)
    );
    setUnselectedOptions(
      unselectedOptions.concat(
        options.find((option) => option.name === optionName)
      )
    );
  };

  const selectSuboption = (optionName, suboption) => {
    const newSelectedOptions = selectedOptions.map((option) => {
      if (option.name !== optionName) {
        return option;
      }

      const newOption = { ...option };
      newOption.selected = suboption;
      return newOption;
    });
    setSelectedOptions(newSelectedOptions);
  };

  const handleAddToBasketClick = (evt) => {
    const orderItemOptionSelections = {};
    selectedOptions.forEach((option) => {
      orderItemOptionSelections[option.name] = option.selected;
    });

    dispatch(
      addItem({
        menuItem: id,
        selectedOptions: orderItemOptionSelections,
      })
    );

    setSelectedOptions([]);
    setUnselectedOptions(options.slice());
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

            <Card.Text className='fs-6 mb-2'>
              {(price / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Card.Text>
            <Card.Text className='mb-2'>{description}</Card.Text>

            {selectedOptions.map((option) => {
              const hyphenatedName = option.name.replaceAll(/\s+/g, '-');

              return (
                <Row key={hyphenatedName} className='mb-1'>
                  <Col xs={5} sm={5} md={4} lg={5} xl={4}>
                    <label htmlFor={hyphenatedName} className='text-nowrap'>
                      {option.name}
                    </label>
                  </Col>
                  <Col className='d-flex align-items-center'>
                    <select
                      id={hyphenatedName}
                      style={{ width: '13ch' }}
                      value={option.selected}
                      onChange={(evt) => {
                        selectSuboption(option.name, evt.target.value);
                      }}
                    >
                      {option.suboptions.map((suboption) => (
                        <option key={`${hyphenatedName}-${suboption}`}>
                          {suboption}
                        </option>
                      ))}
                    </select>
                    <CloseButton
                      aria-label='Remove option'
                      className='ms-2'
                      onClick={(evt) => {
                        removeOption(option.name);
                      }}
                    />
                  </Col>
                </Row>
              );
            })}
            {unselectedOptions.length ? (
              <Dropdown className='mt-2'>
                <Dropdown.Toggle variant='secondary'>
                  Add option
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {unselectedOptions.map((option) => (
                    <Dropdown.Item
                      key={option.name}
                      onClick={handleAddOptionClick}
                    >
                      {option.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            ) : null}

            <Button
              type='button'
              variant='primary'
              className='d-block ms-auto mt-2'
              onClick={handleAddToBasketClick}
            >
              Add to basket
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default MenuItemCard;
