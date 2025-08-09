import { useState, useEffect } from 'react';
import './App.css'
import Grid from './components/Grid/Grid'
import Login from './components/login/Login';
import { io } from 'socket.io-client';

function App() {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user && !socket) {
      const newSocket = io('http://localhost:3001'); // Change port if needed
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [user, socket]);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <>
      <Grid numberOfCards={9} user={user} socket={socket} />
    </>
  )
}

export default App

// Example for Grid.jsx
import { useState, useEffect } from 'react';

function Grid({ numberOfCards, user, socket }) {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on('startGame', (data) => {
        setGameStarted(true);
        // You can also store room info if needed
      });
    }
    return () => {
      if (socket) socket.off('startGame');
    };
  }, [socket]);

  if (!gameStarted) {
    return <div>Waiting for another player...</div>;
  }

  // ...render your game board here...
}

export default Grid;
