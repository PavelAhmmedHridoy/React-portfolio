import { Row, Col, Button } from 'react-bootstrap';
import { ReactTyped } from 'react-typed';
import '../style.css';

function Home() {
  return (
    <section id="Home" className="container min-vh-100 d-flex align-items-center pt-5">
      <Row className="align-items-center">
        <Col md={7}>
          <h1 className="fw-bold reveal-text delay-1">
            <span className="mb-3 reveal-text delay-2">Pavel Ahmmed Hridoy</span>
          </h1>
          <h3 className="mb-3 reveal-text">
            And I am a{' '}
            <ReactTyped
              strings={['Frontend Developer', 'React Enthusiast', 'UI/UX Designer']}
              typeSpeed={40}
              backSpeed={50}
              loop
              className="text-primary"
            />
          </h3>
          <p className="lead mb-4 reveal-text delay-3">
            I am a Junior Frontend Web Developer with skills in HTML, CSS, Bootstrap, Tailwind, and React.
            I am a student of ATI Ishwardi Pabna. Batch (2024-2028).
          </p>
          <div className="d-flex gap-3 mb-4 reveal-text delay-4">
            <a href="https://www.facebook.com/pavel.ahmmed.hridoy" className="social-icon text-primary" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://m.me/Pavel.ahmmed.hridoy" className="btn btn-primary" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-facebook-messenger"></i>
            </a>
            <a href="https://wa.me/8801705533875" className="social-icon text-white bg-success" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
          <Button variant="primary" className="px-4 py-2 reveal-text delay-4 w-100">Download CV</Button>
        </Col>
        <Col md={5} className="text-center mt-4 mt-md-0">
          <img src="https://via.placeholder.com/300" alt="Pavel Ahmmed Hridoy" className="profile-image floating-animation" />
        </Col>
      </Row>
    </section>
  );
}

export default Home;
