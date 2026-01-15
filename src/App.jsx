import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import SelectionPage from './pages/SelectionPage';
import ResultPage from './pages/ResultPage';
import { AudioProvider } from './context/AudioContext';
import './App.css';

function App() {
  return (
    <AudioProvider>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/select" element={<SelectionPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AudioProvider>
  );
}

export default App;
