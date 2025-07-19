import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './style.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://your-backend.onrender.com/api/contact', formData);
      alert('✅ Email sent successfully!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      alert('❌ Failed to send email. Try again later.');
      console.error(error);
    }
  };

  return (
    <section id="Contact" className="container py-5">
      <h2 className="text-center mb-4 reveal-text">
        Contact <span className="text-primary">Me</span>
      </h2>
      <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '800px' }}>
        <Row className="mb-3">
          <Col md={6} className="mb-3 mb-md-0">
            <Form.Control
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-dark text-white border-dark reveal-text"
              required
            />
          </Col>
          <Col md={6}>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="bg-dark text-white border-dark reveal-text delay-1"
              required
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} className="mb-3 mb-md-0">
            <Form.Control
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="bg-dark text-white border-dark reveal-text delay-2"
              required
            />
          </Col>
          <Col md={6}>
            <Form.Control
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="bg-dark text-white border-dark reveal-text delay-3"
              required
            />
          </Col>
        </Row>
        <Form.Control
          as="textarea"
          rows={8}
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="bg-dark text-white border-dark reveal-text delay-3 mb-3"
          required
        />
        <Button type="submit" variant="primary" className="px-4 py-2 w-100 reveal-text">
          Send Message
        </Button>
      </Form>
    </section>
  );
}

export default Contact;
