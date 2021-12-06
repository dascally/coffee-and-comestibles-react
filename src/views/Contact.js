import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

export default function Contact() {
  return (
    <>
      <Container as='section'>
        <Row className='justify-content-center'>
          <Col xl={10} xxl={8}>
            <h1>Contact Info</h1>
            <address>
              <p className='mb-1'>You can reach us by email or phone at:</p>
              <ul className='list-unstyled ps-3 fs-sm-6'>
                <li>
                  <a href='mailto:contact@coffeeandcomestibles.com'>
                    <FontAwesomeIcon icon={faEnvelope} className='me-2' />
                    contact@coffeeandcomestibles.com
                  </a>
                </li>
                <li>
                  <a href='tel:123-555-7890'>
                    <FontAwesomeIcon icon={faPhoneAlt} className='me-2' />
                    (123) 555-7890
                  </a>
                </li>
              </ul>
              <p className='mb-1'>Or visit us in person:</p>
              <p className='ms-3 fs-6'>
                1234 Street Avenue
                <br />
                Townopolis, ST 54321
              </p>
            </address>
          </Col>
        </Row>
      </Container>

      <Container as='section'>
        <Row className='justify-content-center'>
          <Col xl={10} xxl={8}>
            <h1 className='mb-sm-3'>Give us feedback!</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}
