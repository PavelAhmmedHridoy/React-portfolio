import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './style.css';

function ContentSelect() {
  const navigate = useNavigate();
  const [field, setField] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const allSkills = {
    frontend: [
      { name: 'HTML', icon: 'bxl-html5' },
      { name: 'CSS', icon: 'bxl-css3' },
      { name: 'JavaScript', icon: 'bxl-javascript' },
      { name: 'Bootstrap', icon: 'bxl-bootstrap' },
      { name: 'Tailwind', icon: 'bxl-tailwind-css' },
      { name: 'React', icon: 'bxl-react' },
      { name: 'Svelte', icon: 'bxl-svelte' },
    ],
    backend: [
      { name: 'Node.js', icon: 'bxl-nodejs' },
      { name: 'Python', icon: 'bxl-python' },
    ],
    fullstack: [
      { name: 'HTML', icon: 'bxl-html5' },
      { name: 'CSS', icon: 'bxl-css3' },
      { name: 'JavaScript', icon: 'bxl-javascript' },
      { name: 'Bootstrap', icon: 'bxl-bootstrap' },
      { name: 'Tailwind', icon: 'bxl-tailwind-css' },
      { name: 'React', icon: 'bxl-react' },
      { name: 'Svelte', icon: 'bxl-svelte' },
      { name: 'Node.js', icon: 'bxl-nodejs' },
      { name: 'Python', icon: 'bxl-python' },
      { name: 'TypeScript', icon: 'bxl-typescript' },
    ],
  };
  const mutualExclusives = {
    'React': 'Svelte',
    'Svelte': 'React',
    'JavaScript': 'TypeScript',
    'TypeScript': 'JavaScript',
    'Bootstrap': 'Tailwind',
    'Tailwind': 'Bootstrap',
    'Python': 'Node.js',
    'Node.js': 'Python',
  };

  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      const exclusiveSkill = mutualExclusives[skill];
      setSelectedSkills([...selectedSkills.filter(s => s !== exclusiveSkill), skill]);
    }
  };

  const handleSubmit = () => {
    const skillParam = encodeURIComponent(selectedSkills.join(','));
    navigate(`/project-select?field=${field}&skills=${skillParam}`);
  };

  return (
    <section className="bg-slate-900 text-white p-6">
      <Container className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-cyan-400 text-center">Select Field & Skills</h1>
        <Form.Group className="mb-2">
          <Form.Label className="font-semibold">Choose Development Field:</Form.Label>
          <Form.Select value={field} onChange={(e) => setField(e.target.value)} className="bg-gray-800 border-gray-700 p-3">
            <option value="">-- Select Field --</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Full Stack</option>
          </Form.Select>
        </Form.Group>
        {field && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">Select Skills:</h2>
            <div className="row row-cols-2 gap-3">
              {allSkills[field].map(skill => (
                <div key={skill.name} className="d-flex align-items-center gap-2">
                  <Form.Check
                    id={skill.name.replace(/\s+/g, '-')}
                    value={skill.name}
                    checked={selectedSkills.includes(skill.name)}
                    onChange={() => handleSkillChange(skill.name)}
                    className="accent-cyan-500"
                  />
                  <label htmlFor={skill.name.replace(/\s+/g, '-')}>
                    <i className={`bx ${skill.icon} text-cyan-400`}></i> {skill.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        <Button
          disabled={!field || selectedSkills.length === 0}
          onClick={handleSubmit}
          className="mt-6 w-100 bg-cyan-600 text-white py-3"
        >
          Go to Project Selection →
        </Button>
      </Container>
    </section>
  );
}

export default ContentSelect;
