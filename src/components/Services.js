import { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import * as THREE from 'three';
import './style.css';

function ServiceCard({ icon, title, description, link }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 200);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(3, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x161b22, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    camera.position.z = 5;

    let isHovering = false;
    mount.addEventListener('mouseenter', () => (isHovering = true));
    mount.addEventListener('mouseleave', () => (isHovering = false));

    const animate = () => {
      requestAnimationFrame(animate);
      if (isHovering) {
        plane.rotation.y += 0.02;
        plane.rotation.x += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <Col md={6} lg={4} className="mb-4">
      <div className="custom-card p-4 rounded position-relative" style={{ backgroundColor: '#161b22' }}>
        <div ref={mountRef} style={{ height: '200px' }} />
        <div className="text-center">
          <i className={`${icon} fa-2x mb-3 text-primary`}></i>
          <h3 className="mb-3">{title}</h3>
          <p>{description}</p>
          <a href={link} className="btn btn-custom mt-3">Read More</a>
        </div>
      </div>
    </Col>
  );
}

function Services() {
  const services = [
    {
      icon: 'fa-solid fa-code',
      title: 'Web Development',
      description: 'Highly skilled in creating responsive websites using modern frameworks and best practices.',
      link: '/web-services',
    },
    {
      icon: 'fa-solid fa-palette',
      title: 'UI/UX Development',
      description: 'Creating beautiful user interfaces with focus on user experience and accessibility.',
      link: '#',
    },
    {
      icon: 'fa-brands fa-android',
      title: 'App Development',
      description: 'Building modern mobile applications for Android and iOS platforms.',
      link: '#',
    },
  ];

  return (
    <section id="Services" className="py-5">
      <Container>
        <h2 className="text-center mb-5 reveal-text">
          My <span className="text-primary">Services</span>
        </h2>
        <Row className="justify-content-center">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Services;
