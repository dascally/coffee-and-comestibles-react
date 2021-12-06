import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { Row, Col, Table } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className='footer px-4 py-3'>
      <Row className='gx-5 gy-4'>
        <Col
          sm={6}
          md={3}
          lg
          className='d-flex align-items-center justify-content-center text-nowrap'
        >
          <FooterAddress />
        </Col>
        <div className='vr p-0 text-primary d-none d-sm-block' />
        <Col sm md={4} lg xl={3} className='text-nowrap'>
          <FooterHours />
        </Col>
        <div className='vr p-0 text-primary d-none d-md-block' />
        <Col
          md
          lg
          className='d-flex flex-column align-items-center justify-content-center'
        >
          <FooterContact />
        </Col>
      </Row>
    </footer>
  );
}

function FooterAddress() {
  return (
    <address>
      1234 Street Avenue
      <br />
      Townopolis, ST 54321
    </address>
  );
}

function FooterHours() {
  return (
    <Table size='sm' borderless>
      <caption className='caption-top text-center text-reset'>Hours</caption>
      <tbody>
        <tr>
          <th className='fw-light pe-2'>Monday-Friday</th>
          <td>9am - 5pm</td>
        </tr>
        <tr>
          <th className='fw-light'>Saturday</th>
          <td>9am - 1pm</td>
        </tr>
        <tr>
          <th className='fw-light'>Sunday</th>
          <td>closed</td>
        </tr>
      </tbody>
    </Table>
  );
}
function FooterContact() {
  return (
    <>
      <address className='lh-lg'>
        <a href='mailto:contact@coffeeandcomestibles.com'>
          <FontAwesomeIcon icon={faEnvelope} className='me-2' />
          contact@coffeeandcomestibles.com
        </a>
        <br />
        <a href='tel:123-555-7890'>
          <FontAwesomeIcon icon={faPhoneAlt} className='me-2' />
          (123) 555-7890
        </a>
      </address>
      <div className='fs-4 text-primary d-flex'>
        <a href='#' className='link-primary me-4'>
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href='#' className='link-primary me-4'>
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href='#' className='link-primary me-4'>
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a
          href='https://github.com/dascally/coffee-and-comestibles-react'
          className='link-primary'
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </>
  );
}
