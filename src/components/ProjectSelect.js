import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import './style.css';

function ProjectSelect() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Sample Project",
      description: "A sample project for testing",
      image: "https://via.placeholder.com/300",
      url: "https://example.com",
      modes: {
        basic: { image: "https://via.placeholder.com/300", description: "Basic mode", url: "https://example.com" },
        medium: { image: "https://via.placeholder.com/300", description: "Medium mode", url: "https://example.com" },
        advanced: { image: "https://via.placeholder.com/300", description: "Advanced mode", url: "https://example.com" }
      }
    }
  ]);

  useEffect(() => {
    axios.get('https://your-backend.onrender.com/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));

    const handleClick = (e) => {
      if (e.target.classList.contains('zoomable')) {
        e.target.classList.toggle('zoomed');
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <section className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-gray-800">
      <header className="bg-white shadow sticky-top p-4">
        <h1 className="text-2xl font-bold text-center text-indigo-700">Select Your Project</h1>
      </header>
      <Container className="max-w-6xl px-4 py-10">
        <Row className="g-4">
          {projects.map(project => (
            <Col sm={6} lg={4} key={project.id}>
              <Card as="a" href={`/project-details?product=${project.id}`} className="p-4 card cursor-pointer">
                <Card.Img
                  variant="top"
                  src={project.image}
                  className="rounded mb-3 h-40 w-100 object-cover zoomable"
                  alt={project.title}
                />
                <Card.Title className="text-lg font-semibold text-indigo-700">{project.title}</Card.Title>
                <Card.Text className="text-sm text-gray-600">{project.description}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default ProjectSelect;
