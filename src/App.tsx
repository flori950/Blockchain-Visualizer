import { HelmetProvider } from 'react-helmet-async';
import { BlockchainProvider } from './context/BlockchainContext';
import { BlockchainVisualization } from './components/BlockchainVisualization';
import { BlockVisualization3D } from './components/BlockVisualization3D';
import { ControlPanel } from './components/ControlPanel';
import { SEO } from './components/SEO';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <BlockchainProvider>
        <div className="app">
          <SEO />
          <header className="app-header">
            <h1>🔗 Blockchain Visualizer</h1>
            <p>Interactive blockchain demonstration with proof-of-work mining</p>
          </header>
          
          <main className="app-main">
            <ControlPanel />
            <BlockchainVisualization />
            <BlockVisualization3D />
          </main>
          
          <Footer />
        </div>
      </BlockchainProvider>
    </HelmetProvider>
  );
}

export default App;
