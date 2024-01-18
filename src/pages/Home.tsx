import React, { FunctionComponent } from 'react';
import Button from '../components/Button';
import Layout from './Layout';
import logo from '../assets/svgexport-1.svg';

const Home: FunctionComponent = () => {
  return (
    <Layout>
      <div className='flex flex-col lg:flex-row relative'>
        <div className='flex flex-col justify-items-center gap-y-5 py-28 z-50'>
          <div className='flex flex-col gap-x-2'>
            <p className='text-7xl font-semibold'>Créons <strong>ensemble </strong></p>
            <p className='text-7xl font-semibold'>votre réussite</p>
            <p className='text-7xl font-semiblod'>numérique</p>
          </div>
          <div className='flex flex-col gap-x-2'>
            <p className='text-lg'>
              6TM est une société de conseil en transformation
            </p>
            <p className='text-lg'>
              numérique. De l'idée à la réalisation, nous accompagnons
            </p>
            <p className='text-lg'>
              nos clients PME, ETI, Grands Comptes, pour donner vie à
            </p>
            <p className='text-lg'>
              des projets digitaux intelligents et durables.
            </p>
          </div>
          <div className='flex flex-row gap-x-2'>
            <Button type='primary' link='https://www.6tm.com/entreprise-transformation-
            digitale'>
              À PROPOS DE NOUS
            </Button>
            <Button type='invert' link='https://www.6tm.com/nous-rejoindre-chez-6tm/'>
              NOUS REJOINDRE
            </Button>
          </div>
        </div>
        <img
          className='ml-96 absolute z-0 -top-[500px] -left-24'
          src={logo}
          alt='logo'/>
      </div>
    </Layout>
  );
};

export default Home;
