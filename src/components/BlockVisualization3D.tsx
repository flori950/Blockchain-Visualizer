import { useBlockchain } from '../hooks/useBlockchain';
import type { Block } from '../types/blockchain';
import './BlockVisualization3D.css';

export function BlockVisualization3D() {
  const { state } = useBlockchain();

  const getBlockClass = (block: Block, index: number) => {
    let className = 'block-3d';
    if (block.isMining) className += ' mining-3d';
    else if (block.isMined && block.isValid) className += ' valid-3d';
    else if (block.isMined && !block.isValid) className += ' invalid-3d';
    else if (!block.isMined && index > 0) className += ' unmined-3d';
    return className;
  };

  const getBlockContent = (block: Block) => {
    const data = typeof block.data === 'string' ? block.data : 'Transactions';
    return data.length > 15 ? data.substring(0, 15) + '...' : data;
  };

  return (
    <div className="block-visualization-3d">
      <div className="visualization-header">
        <h3>🧊 3D Block Visualization</h3>
        <p>Visual representation of the blockchain as connected blocks</p>
      </div>
      
      <div className="blocks-3d-container">
        <div className="blocks-3d-track">
          {state.blocks.map((block, index) => (
            <div key={block.index} className="block-3d-wrapper">
              <div className={getBlockClass(block, index)}>
                <div className="block-face front">
                  <div className="block-number">#{block.index}</div>
                  <div className="block-data">{getBlockContent(block)}</div>
                  <div className="block-status">
                    {block.index === 0 ? '🔗' : 
                     block.isMining ? '⚡' :
                     block.isMined && block.isValid ? '✅' : 
                     block.isMined && !block.isValid ? '❌' :
                     '⏳'}
                  </div>
                </div>
                <div className="block-face back">
                  <div className="hash-display">
                    {block.hash.substring(0, 8)}...
                  </div>
                </div>
                <div className="block-face left"></div>
                <div className="block-face right"></div>
                <div className="block-face top"></div>
                <div className="block-face bottom"></div>
              </div>
              
              {index < state.blocks.length - 1 && (
                <div className={`chain-link-3d ${
                  state.blocks[index + 1].previousHash === block.hash ? 'connected-3d' : 'broken-3d'
                }`}>
                  <div className="link-cylinder"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
