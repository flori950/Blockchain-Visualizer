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
            <div className="header-content">
              <div className="header-main">
                <div className="header-icon">
                  <div className="cube-container">
                    <div className="cube">
                      <div className="cube-face front">
                        <div className="block-number">#0</div>
                        <div className="block-label">Genesis</div>
                      </div>
                      <div className="cube-face back">
                        <div className="hash-text">Hash</div>
                      </div>
                      <div className="cube-face right">
                        <div className="block-text">Block</div>
                      </div>
                      <div className="cube-face left">
                        <div className="chain-text">Chain</div>
                      </div>
                      <div className="cube-face top">
                        <div className="data-text">Data</div>
                      </div>
                      <div className="cube-face bottom">
                        <div className="nonce-text">Nonce</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="header-text">
                  <h1 className="header-title">
                    <span className="title-highlight">Blockchain</span> Visualizer
                  </h1>
                  <p className="header-subtitle">
                    Interactive demonstration of blockchain technology with proof-of-work mining
                  </p>
                </div>
              </div>
            </div>
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
