import './App.css'
import Grid from './components/Grid/Grid'
import LandingPage from './components/landing-page/landingpage'
import backgroundMusic from './components/bg-music/bgmusic'


function App() {
  return (
    <>
      {/* include ng music */}
      <backgroundMusic src='./Assets/music/sound1.mp3' /> 
      <Grid numberOfCards={9} />
      
    </>
  )
}

export default App
