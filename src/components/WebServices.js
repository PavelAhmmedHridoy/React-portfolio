import { Row, Col, Card } from 'react-bootstrap';
import './style.css';

function WebServices() {
  const skills = [
    { name: 'HTML', color: '#e34c26', icon: 'bxl-html5', description: 'The foundation of web content. Semantic HTML ensures accessibility, SEO, and structure.', tags: ['Markup', 'SEO', 'Semantics'] },
    { name: 'CSS', color: '#2965f1', icon: 'bxl-css3', description: 'From layouts to animations, CSS powers visual beauty and responsiveness.', tags: ['Flexbox', 'Grid', 'Animations'] },
    { name: 'JavaScript', color: '#f0db4f', icon: 'bxl-javascript', description: 'Dynamic interactivity, API consumption, and application logic come alive with JavaScript.', tags: ['DOM', 'ES6+', 'Fetch API'] },
    { name: 'Bootstrap', color: '#7952b3', icon: 'bxl-bootstrap', description: 'Rapid development framework that ensures responsive layouts and UI components.', tags: ['Grid', 'Components', 'Utility Classes'] },
    { name: 'Tailwind', color: '#38bdf8', icon: 'bxl-tailwind-css', description: 'Utility-first CSS for building modern and custom interfaces quickly with clean HTML.', tags: ['JIT', 'Responsive', 'Design System'] },
    { name: 'React', color: '#00d8ff', icon: 'bxl-react', description: 'Component-based frontend library for dynamic UIs with fast rendering and SPA capabilities.', tags: ['JSX', 'Hooks', 'State'] },
    { name: 'TypeScript', color: '#007acc', icon: 'bxl-typescript', description: 'A strict superset of JavaScript for scalable apps with static typing and IDE support.', tags: ['OOP', 'Types', 'Tooling'] },
    { name: 'Svelte', color: '#ff3e00', icon: 'bxl-svelte', description: 'Compile-time framework for lightning-fast web apps with less boilerplate.', tags: ['Reactive', 'Compile', 'Lightweight'] },
    { name: 'Node.js', color: '#3c873a', icon: 'bxl-nodejs', description: 'JavaScript runtime for building scalable backend services with non-blocking I/O.', tags: ['Express', 'APIs', 'Middleware'] },
    { name: 'Python', color: '#3572A5', icon: 'bxl-python', description: 'High-level scripting for automation, data, and backend APIs using Flask or Django.', tags: ['Flask', 'Django', 'Scripting'] },
  ];

  return (
    <section className="container py-5">
      <h1 className="text-info mb-4 text-center">Full Stack Web Development Toolkit</h1>
      <p className="text-secondary text-center mb-5">
        A modern full stack developer blends design, logic, and systems to craft dynamic, interactive, and scalable web experiences.
      </p>
      <Row className="g-4">
        {skills.map(skill => (
          <Col md={6} lg={4} key={skill.name} style={{ '--skill-color': skill.color }}>
            <Card className="p-4 text-center" style={{ backgroundColor: '#161b22', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div className="icon-wrapper text-white" style={{ background: skill.color }}>
                <i className={`bx ${skill.icon}`}></i>
              </div>
              <h5 className="fw-bold text-white">{skill.name}</h5>
              <p className="text-muted">{skill.description}</p>
              <span className="badge">{skill.tags.join(' | ')}</span>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default WebServices;
