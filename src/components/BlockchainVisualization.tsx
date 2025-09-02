import React from 'react';
import { Block } from './Block';
import { useBlockchain } from '../hooks/useBlockchain';
import './BlockchainVisualization.css';

export function BlockchainVisualization() {
  const { state, selectBlock, mineBlock, updateBlockData } = useBlockchain();

  const handleBlockSelect = (blockIndex: number) => {
    selectBlock(state.selectedBlock === blockIndex ? null : blockIndex);
  };

  const handleMineBlock = (blockIndex: number) => {
    mineBlock(blockIndex);
  };

  const handleUpdateBlockData = (blockIndex: number, data: string) => {
    updateBlockData(blockIndex, data);
  };

  return (
    <div className="blockchain-visualization">
      <div className="chain-header">
        <h2>Blockchain Visualization</h2>
        <div className={`chain-status ${state.isValidChain ? 'valid' : 'invalid'}`}>
          {state.isValidChain ? '✓ Valid Chain' : '✗ Invalid Chain'}
        </div>
      </div>

      {state.blocks.length > 1 && (
        <div className="drag-instructions">
          💡 <strong>Tip:</strong> Drag blocks to reorder them (except the Genesis block). Watch how
          this affects the chain validity!
        </div>
      )}

      <div className="blocks-container">
        {state.blocks.map((block, index) => (
          <React.Fragment key={block.index}>
            <Block
              block={block}
              isSelected={state.selectedBlock === index}
              onSelect={() => handleBlockSelect(index)}
              onMine={() => handleMineBlock(index)}
              onUpdateData={(data) => handleUpdateBlockData(index, data)}
            />
            {index < state.blocks.length - 1 && (
              <div
                className={`chain-arrow ${
                  state.blocks[index + 1].previousHash === block.hash ? 'connected' : 'disconnected'
                }`}
              >
                <div className="arrow">→</div>
                <div className="hash-connection">
                  {state.blocks[index + 1].previousHash === block.hash
                    ? 'Connected'
                    : 'Broken Link'}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
