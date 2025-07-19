import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './style.css';

const skills = [
  { name: 'HTML', color: 0xe34c26, icon: 'bxl-html5', percent: 90, orbit: 2 },
  { name: 'CSS', color: 0x2965f1, icon: 'bxl-css3', percent: 85, orbit: 2 },
  { name: 'JavaScript', color: 0xf0db4f, icon: 'bxl-javascript', percent: 80, orbit: 3 },
  { name: 'Bootstrap', color: 0x7952b3, icon: 'bxl-bootstrap', percent: 75, orbit: 4 },
  { name: 'Tailwind', color: 0x38bdf8, icon: 'bxl-tailwind-css', percent: 85, orbit: 3 },
  { name: 'React', color: 0x00d8ff, icon: 'bxl-react', percent: 70, orbit: 2 },
  { name: 'TypeScript', color: 0x007acc, icon: 'bxl-typescript', percent: 65, orbit: 4 },
  { name: 'Svelte', color: 0xff3e00, icon: 'bxl-svelte', percent: 60, orbit: 5 },
  { name: 'Node.js', color: 0x3c873a, icon: 'bxl-nodejs', percent: 75, orbit: 5 },
  { name: 'Python', color: 0x3572a5, icon: 'bxl-python', percent: 80, orbit: 4 },
];

function Skills() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
    mount.appendChild(renderer.domElement);

    const nucleusGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const nucleusMaterial = new THREE.MeshBasicMaterial({ color: 0x14141e, transparent: true, opacity: 0.6 });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    scene.add(nucleus);

    const electrons = skills.map((skill, index) => {
      const orbitRadius = skill.orbit;
      const angle = (index / skills.length) * Math.PI * 2;
      const geometry = new THREE.SphereGeometry(0.2, 16, 16);
      const material = new THREE.MeshBasicMaterial({ color: skill.color });
      const electron = new THREE.Mesh(geometry, material);
      electron.position.set(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius);
      scene.add(electron);
      return { mesh: electron, angle, orbitRadius, speed: 0.01 + index * 0.002 };
    });

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      electrons.forEach((electron) => {
        electron.angle += electron.speed;
        electron.mesh.position.set(
          Math.cos(electron.angle) * electron.orbitRadius,
          0,
          Math.sin(electron.angle) * electron.orbitRadius
        );
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section id="Skills" className="container py-5 text-center">
      <h2 className="mb-5 reveal-text">
        My <span className="text-primary">Skills</span>
      </h2>
      <p className="text-white-50 mb-4">Skills orbit around a 3D nucleus</p>
      <div ref={mountRef} style={{ margin: '0 auto', maxWidth: '500px' }} />
    </section>
  );
}

export default Skills;
