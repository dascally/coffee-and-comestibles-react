import { Container, Row, Col, Form, Button } from 'react-bootstrap';
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
            <FeedbackForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

function FeedbackForm() {
  return (
    <Form>
      <Form.Group controlId='name' as={Row} className='mb-1 mb-sm-3'>
        <Form.Label column sm={2}>
          Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type='text' name='name' />
        </Col>
      </Form.Group>
      <Form.Group controlId='email' as={Row} className='mb-1 mb-sm-3'>
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control type='email' name='email' />
        </Col>
      </Form.Group>
      <Form.Group controlId='phone' as={Row} className='mb-1 mb-sm-3'>
        <Form.Label column sm={2}>
          Phone
        </Form.Label>
        <Col sm={10}>
          <Form.Control type='telephone' name='phone' />
        </Col>
      </Form.Group>
      <fieldset className='row mb-1 mb-sm-3'>
        <legend className='col-sm-2 col-form-label'>Rating</legend>
        <Col sm={10} className='pt-sm-2'>
          <Form.Check
            inline
            type='radio'
            value='1'
            label='1'
            name='rating'
            id='rating1'
          />
          <Form.Check
            inline
            type='radio'
            value='2'
            label='2'
            name='rating'
            id='rating2'
          />
          <Form.Check
            inline
            type='radio'
            value='3'
            label='3'
            name='rating'
            id='rating3'
          />
          <Form.Check
            inline
            type='radio'
            value='4'
            label='4'
            name='rating'
            id='rating4'
          />
          <Form.Check
            inline
            type='radio'
            value='5'
            label='5'
            name='rating'
            id='rating5'
          />
        </Col>
      </fieldset>
      <Form.Group controlId='feedback' as={Row} className='mb-3'>
        <Form.Label column sm={2}>
          Feedback
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as='textarea'
            name='feedback'
            placeholder='What have we done well? What can we do better?'
            required
            rows={8}
          />
        </Col>
      </Form.Group>
      <Row>
        <Col className='text-center'>
          <Button type='submit' variant='primary'>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
