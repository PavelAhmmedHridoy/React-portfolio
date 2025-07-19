import { Container } from 'react-bootstrap';
import './style.css';

function Footer() {
  return (
    <footer className="py-4 text-center" style={{ backgroundColor: 'var(--snd-bg-color)' }}>
      <Container className="d-flex justify-content-between align-items-center flex-wrap">
        <p className="mb-0">© 2025 Pavel Ahmmed Hridoy. All rights reserved.</p>
        <a href="#Home" className="footer-icon">
          <i className="fa-solid fa-angle-up text-dark" style={{ fontSize: '1.5rem' }}></i>
        </a>
      </Container>
    </footer>
  );
}

export default Footer;
