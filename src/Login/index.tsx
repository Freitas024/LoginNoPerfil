import { useState,ChangeEvent } from 'react';
import axios, { AxiosRequestHeaders } from 'axios';

export default function Login() {

  const [email,setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {

    setEmail(event.target.value);

    console.log(email);
  }

  const handleChangePassword = (event:ChangeEvent<HTMLInputElement>) => {

    setPassword(event.target.value);

    console.log(password);
  }

  //headers para requisição.
  const headers = {
    'Authorization': '86a3ad9kr',
    'Accept': 'application/json;version=v1_web',
    'Content-Type': 'application/json'
  }

  const fetchData = async () => {

    
    const url = 'https://api.homologation.cliqdrive.com.br/auth/profile/';
    try {
      const response = await axios.get(url, { headers });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const postData = async () => {
    const url = 'https://api.homologation.cliqdrive.com.br/auth/login/';

    const data = {
      Email: email,
      Password: password,
    };
    
    try {
      const response = await axios.post(url, data, { headers });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex flex-col'>
      <h1>B2BIT</h1>
      <input className="border-solid border-2 border-sky-500" type='Email' value={email} onChange={handleChangeEmail}/>
      <input className="border-solid border-2 border-sky-500" type='password' value={password} onChange={handleChangePassword}/>
      <button onClick={fetchData}>Sign in</button>
    </div>
  );
}
