import type { NextPage } from 'next';
import Head              from 'next/head';
import Container         from '../src/components/Container';

const Home: NextPage = () => {
  return (
    <div className="w-full">
      <Head>
        <title>Eshanized</title>
        <meta name="description" content="Eshan Roy (eshanized) - A passionate programmer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Container />
    </div>
  )
}

export default Home;
