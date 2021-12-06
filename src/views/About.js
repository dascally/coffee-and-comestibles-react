import { Container, Row, Col, Image } from 'react-bootstrap';
import cafeInteriorSmImg from '../assets/cafe-interior-sm.jpg';

export default function About() {
  return (
    <Container as='section'>
      <Row className='justify-content-center'>
        <Col xl={10} xxl={8}>
          <h1>About Us</h1>
          <div
            className='
              d-flex
              justify-content-center
              float-sm-end
              mb-2
              ms-sm-2
              mb-sm-0
            '
          >
            <div className='position-relative'>
              <Image
                src={cafeInteriorSmImg}
                alt='Interior of the cafe'
                rounded
                className='mw-100'
              />
            </div>
          </div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A dolores
            voluptatem sit inventore suscipit, pariatur veritatis doloremque
            minus libero dicta quos ratione sed explicabo temporibus dolore eum?
            Placeat, dolorem laboriosam?
          </p>
          <p>
            Voluptatem est sapiente doloribus magni ut impedit eveniet eius
            veniam laudantium facilis unde nobis odio distinctio quod
            exercitationem reprehenderit necessitatibus neque labore voluptate
            mollitia, assumenda vero voluptatum suscipit nisi. Quo!
          </p>
          <p>
            Necessitatibus, accusantium iusto. Perferendis maiores expedita
            ducimus recusandae tempora ea illo eum voluptatem deserunt
            reprehenderit dolores, ab id sed quidem qui quibusdam, aliquam
            deleniti modi eos. Voluptate impedit animi aliquid?
          </p>
        </Col>
      </Row>
    </Container>
  );
}
