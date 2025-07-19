import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function ProjectDetails() {
  const location = useLocation();
  const productId = new URLSearchParams(location.search).get('product');
  const [project, setProject] = useState(null);
  const [activeMode, setActiveMode] = useState('basic');

  useEffect(() => {
    if (productId) {
      axios.get(`https://your-backend.onrender.com/api/projects/${productId}`)
        .then(response => setProject(response.data))
        .catch(error => console.error('Error fetching project:', error));
    }

    const handleClick = (e) => {
      if (e.target.classList.contains('zoomable')) {
        e.target.classList.toggle('zoomed');
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [productId]);

  if (!project) return <div>Loading...</div>;

  const renderMode = (mode) => {
    const selected = project.modes[mode];
    return (
      <>
        <img className="w-100 h-64 object-cover rounded-md mb-4 zoomable" src={selected.image} alt="Project Preview" />
        <h2 className="text-2xl font-bold text-center mb-2">{`${project.title} - ${mode.toUpperCase()}`}</h2>
        <p className="text-gray-600 text-center mb-4">{selected.description}</p>
        <div className="text-center">
          <Button as="a" href={selected.url} target="_blank" rel="noreferrer" className="px-4 py-2 bg-indigo-600 text-white">
            Visit Project
          </Button>
        </div>
      </>
    );
  };

  return (
    <section className="bg-gradient-to-br from-blue-100 via-white to-indigo-100 min-vh-100">
      <nav className="bg-white shadow-md p-4 d-flex justify-content-between align-items-center">
        <div className="text-2xl font-bold text-red-600">ProjectViewer</div>
        <a href="/project-select" className="text-gray-600">← Back to Projects</a>
      </nav>
      <Container className="max-w-5xl px-4 py-10">
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          {renderMode(activeMode)}
        </div>
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-3">Choose Mode</h3>
          <Row className="justify-content-center gap-4">
            {Object.keys(project.modes).map(mode => (
              <Col xs="auto" key={mode}>
                <img
                  onClick={() => setActiveMode(mode)}
                  className="w-24 h-24 object-cover rounded cursor-pointer border-2 border-gray-300 hover:border-indigo-500"
                  src={project.modes[mode].image}
                  alt={mode}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
}

export default ProjectDetails;
