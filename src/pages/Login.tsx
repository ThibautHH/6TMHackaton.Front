import React, { FunctionComponent, useState } from 'react';
import { Alert, Button, Input } from '../components';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/api';

const Login: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({text: '', type: '', title: ''});

  const handleAlert = (text: string, type: string, title: string) => {
    setAlert({text: text, type: type, title: title});
    setTimeout(() => {
      setAlert({text: '', type: '', title: ''});
    }, 5000);
  };

  const handleLogin = async () => {
    const response = await getToken(email, password);
    if (response.status !== 200) {
      console.error('Failed to login');
      handleAlert(response.data.message, 'alert', 'Connexion échouée');
      return;
    }
    if(signIn({
      token: response.data.token,
      expiresIn: 43200,
      tokenType: 'Bearer',
      authState: {
        email: email,
        password: password,
        isAuthenticated: true,
        token: response.data.token
      }
    })) {
      console.info('Logged in successfully');
      navigate('/admin');
    } else {
      console.error('Failed to login');
    }
  };

  return (
    <>
      <div className='flex flex-col items-center h-screen w-full p-5
      md:p-10 relative'>
        <div className='flex flex-col items-center justify-center w-96'>
          <h1 className='text-4xl font-bold text-left w-full'>
            Connexion
          </h1>
          <p className='text-black-700 mb-5 text-left w-full'>
            Connectez-vous pour accéder à votre compte.
          </p>
          <div className='flex flex-col gap-y-5 w-full'>
            <Input
              type='text'
              placeholder='Email'
              value={email}
              id='email'
              title='Email'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type='password'
              placeholder='Mot de passe'
              value={password}
              id='password'
              title='Mot de passe'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='invert'
              className='w-full'
              onClick={() => handleLogin()}
              disabled={email.length <= 0 || password.length <= 0}
            >
              Se connecter
            </Button>
            <button className='text-sm text-black-700 hover:text-black-800
            hover:underline w-full text-left'
            onClick={() => handleAlert(
              'Veuillez contacter votre administrateur pour réinitialiser votre mot \
              de passe',
              'info',
              'Mot de passe oublié'
            )}>
              Mot de passe oublié ?
            </button>
          </div>
        </div>
        {alert.text !== '' && (
          <Alert
            message={alert.text}
            type={alert.type}
            title={alert.title}
            className='fixed bottom-5 z-[1000] left-5 md:w-11/12'
          />
        )}
      </div>
    </>
  );
};

export default Login;
