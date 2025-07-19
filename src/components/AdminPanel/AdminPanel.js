import { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import '../../style.css';

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    url: '',
    modes: { basic: { image: '', description: '', url: '' }, medium: { image: '', description: '', url: '' }, advanced: { image: '', description: '', url: '' } }
  });

  useEffect(() => {
    axios.get('https://your-backend.onrender.com/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://your-backend.onrender.com/api/login', credentials);
      if (response.data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('token', response.data.token);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://your-backend.onrender.com/api/projects', newProject, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProjects([...projects, newProject]);
      setNewProject({
        title: '',
        description: '',
        image: '',
        url: '',
        modes: { basic: { image: '', description: '', url: '' }, medium: { image: '', description: '', url: '' }, advanced: { image: '', description: '', url: '' } }
      });
    } catch (error) {
      alert('Failed to add project');
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`https://your-backend.onrender.com/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      alert('Failed to delete project');
    }
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-5">
        <h2 className="text-center mb-4">Admin Login</h2>
        <Form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: '400px' }}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">Login</Button>
        </Form>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Admin Panel</h2>
      <h3>Add New Project</h3>
      <Form onSubmit={handleAddProject} className="mb-5">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            value={newProject.image}
            onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Project URL</Form.Label>
          <Form.Control
            type="text"
            value={newProject.url}
            onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
            required
          />
        </Form.Group>
        {['basic', 'medium', 'advanced'].map(mode => (
          <div key={mode}>
            <h4>{mode.charAt(0).toUpperCase() + mode.slice(1)} Mode</h4>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={newProject.modes[mode].image}
                onChange={(e) => setNewProject({
                  ...newProject,
                  modes: { ...newProject.modes, [mode]: { ...newProject.modes[mode], image: e.target.value } }
                })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={newProject.modes[mode].description}
                onChange={(e) => setNewProject({
                  ...newProject,
                  modes: { ...newProject.modes, [mode]: { ...newProject.modes[mode], description: e.target.value } }
                })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                value={newProject.modes[mode].url}
                onChange={(e) => setNewProject({
                  ...newProject,
                  modes: { ...newProject.modes, [mode]: { ...newProject.modes[mode], url: e.target.value } }
                })}
                required
              />
            </Form.Group>
          </div>
        ))}
        <Button type="submit" variant="primary">Add Project</Button>
      </Form>
      <h3>Manage Projects</h3>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td><img src={project.image} alt={project.title} style={{ width: '100px' }} /></td>
              <td><a href={project.url} target="_blank" rel="noreferrer">Link</a></td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteProject(project.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminPanel;
