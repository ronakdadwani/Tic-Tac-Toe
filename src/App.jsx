import { useState } from 'react';
import './App.css'
import Grid from './components/Grid/Grid'
import Login from './components/login/Login';

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <>
      <Grid numberOfCards={9} user={user} />
    </>
  )
}

export default App
