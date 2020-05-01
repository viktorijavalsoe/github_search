
import React, { useState } from 'react';
import DBConnection from './components/DBConnection';

const App = () => {
  const [token, setToken] = useState<string>('');
  return (
    <>
      <form onSubmit={() => localStorage.setItem('token', token)}>
        <p>GitHUb Custom AccessToken:</p>
        <input style={{ border: 'red' }} type="text" name="token" value={token} onChange={(event: React.ChangeEvent<HTMLInputElement>):void => setToken(event.target.value)} />
      </form>
      <DBConnection />
    </>
  );
};


export default App;
