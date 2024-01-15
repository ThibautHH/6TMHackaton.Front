import React, { FunctionComponent } from 'react';
import Layout from './Layout';
import { Button } from '../components';
import { useNavigate } from 'react-router-dom';

const NotFound: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className='flex flex-col relative py-52'>
        <h1 className='text-6xl font-bold'>
          Erreur 404
        </h1>
        <p className='text-2xl font-regular'>
          Oups, nous n'avons pas trouvé la page que vous cherchiez.
          N'hésitez pas à consulter nos autres pages dans la navigation.
          Vous y trouverez peut-être votre bonheur.
        </p>
        <Button type='invert' className='mt-10' onClick={() => navigate('/')}>
          Retour à l'accueil
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
