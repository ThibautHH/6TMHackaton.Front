import React, { FunctionComponent } from 'react';
import { Button, Input } from '../components';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const Login: FunctionComponent = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleLogin = () => {
    signIn({
      token: 'token',
      expiresIn: 43200,
      tokenType: 'Bearer',
      authState: {
        email: email,
        password: password,
        isAuthenticated: true,
        userId: 1
      }
    });
    navigate('/admin');
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center justify-center w-96'>
        <h1 className='text-4xl font-bold text-left w-full'>
          Connexion
        </h1>
        <p className='text-gray-400 mb-5 text-left w-full'>
          Connectez-vous pour accéder à votre compte.
        </p>
        <form className='flex flex-col gap-y-5 w-full'>
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
          >
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
