import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CockpitButton } from './components/Button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 2)}>
            count is: {count + 22}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <CockpitButton name="cockpit JS" />
      </header>
    </div>
  );
}

export default App;
