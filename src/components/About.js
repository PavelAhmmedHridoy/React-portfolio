import { Row, Col, Button } from 'react-bootstrap';
import '../style.css';

function About() {
  return (
    <section className="container py-5" id="About">
      <Row className="align-items-center justify-content-center justify-content-between">
        <Col md={5} className="text-center about-img mb-4 mb-md-0">
          <img src="https://via.placeholder.com/300" alt="Pavel Ahmmed Hridoy" className="img-fluid reveal-text" />
        </Col>
        <Col md={7}>
          <h2 className="mb-4 reveal-text">About <span className="text-primary">Me</span></h2>
          <h3 className="mb-3 reveal-text delay-1">Junior Frontend Developer</h3>
          <p className="lead mb-4 reveal-text delay-2">
            I am a Junior Frontend Web Developer with skills in HTML, CSS, Bootstrap, Tailwind, and React.
            I am a student of ATI Ishwardi Pabna, Batch (2024-2028).
          </p>
          <Button variant="primary" className="px-4 py-2 reveal-text delay-3">Read More</Button>
        </Col>
      </Row>
    </section>
  );
}

export default About;
