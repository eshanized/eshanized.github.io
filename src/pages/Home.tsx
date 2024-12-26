import Layout from '../components/Layout';
import Hero from '../components/home/Hero';
import Skills from '../components/home/Skills';

function Home() {
  return (
    <Layout
      title="Home"
      description="Welcome to my portfolio - Full Stack Developer specializing in modern web technologies"
    >
      <Hero />
      <Skills />
    </Layout>
  );
}

export default Home;