import React from 'react';
import Layout from '../components/Layout';
import Biography from '../components/about/Biography';
import Experience from '../components/about/Experience';
import Education from '../components/about/Education';
import Contact from '../components/about/Contact';

function About() {
  return (
    <Layout
      title="About"
      description="Learn more about my background, experience, and skills"
    >
      <div className="max-w-4xl mx-auto">
        <Biography />
        <Experience />
        <Education />
        <Contact />
      </div>
    </Layout>
  );
}

export default About;