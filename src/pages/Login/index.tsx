import { useState, ChangeEvent } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const fetchData = async () => {
    const url = 'https://api.homologation.cliqdrive.com.br/auth/profile/';

    try {
      const response = await axios.get(url);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClick = async () => {
    const url = 'https://api.homologation.cliqdrive.com.br/auth/login/';

    const data = {
      email: email, 
      password: password,
    };

    const headers = {
      //'Authorization':`Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
      'Accept': 'application/json;version=v1_web',
      'Content-Type': 'application/json'
    }
    
    try {
      const response = await axios.post(url, data, {headers});
      if(response.status === 200){
        localStorage.setItem('user_token', response.data.tokens.access);
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className='flex flex-col'>
      <h1>B2BIT</h1>
      <input
        className="border-solid border-2 border-sky-500"
        type='Email'
        value={email}
        onChange={handleChangeEmail}
      />
      <input
        className="border-solid border-2 border-sky-500"
        type='password'
        value={password}
        onChange={handleChangePassword}
      />
      <button disabled={!email || !password} onClick={handleClick} className='bg-blue-400 text-white'>Sign in</button>
    </div>
  );
}
