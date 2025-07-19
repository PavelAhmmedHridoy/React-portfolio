import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WebServices from './WebServices';
import ContentSelect from './ContentSelect';
import ProjectSelect from './ProjectSelect';
import '../style.css';

function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('https://rsn.onrender.com/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <Container className="py-5" id="Portfolio">
      <h2 className="text-center mb-5 reveal-text">Portfolio</h2>
      <Tabs defaultActiveKey="projects" id="portfolio-tabs" className="mb-4">
        <Tab eventKey="projects" title="Projects">
          <Row>
            {projects.map(project => (
              <Col md={4} key={project.id} className="mb-4">
                <Card className="custom-card portfolio-card">
                  <Card.Img variant="top" src={project.image} style={{ height: '200px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                    <Card.Text>{project.description}</Card.Text>
                    <Link to={`/portfolio/project/${project.id}`} className="btn btn-primary">View Details</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>
        <Tab eventKey="webservices" title="Web Services">
          <WebServices />
        </Tab>
        <Tab eventKey="contentselect" title="Content Select">
          <ContentSelect />
        </Tab>
        <Tab eventKey="projectselect" title="Project Select">
          <ProjectSelect />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Portfolio;
