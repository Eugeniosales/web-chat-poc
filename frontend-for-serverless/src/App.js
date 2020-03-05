import React from 'react';
import './App.css';
import Navigation from './components/Navegation';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <Navigation title="Onboard Atendimento"/>
      <div className="container">
        <Routes />
      </div>
    </div>
  );
}

export default App;