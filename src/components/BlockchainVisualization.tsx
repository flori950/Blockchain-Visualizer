import React, { useState } from 'react';
import { Block } from './Block';
import { useBlockchain } from '../hooks/useBlockchain';
import './BlockchainVisualization.css';

export function BlockchainVisualization() {
  const { state, selectBlock, mineBlock, updateBlockData, reorderBlocks } = useBlockchain();
  const [draggedBlockIndex, setDraggedBlockIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleBlockSelect = (blockIndex: number) => {
    selectBlock(state.selectedBlock === blockIndex ? null : blockIndex);
  };

  const handleMineBlock = (blockIndex: number) => {
    mineBlock(blockIndex);
  };

  const handleUpdateBlockData = (blockIndex: number, data: string) => {
    updateBlockData(blockIndex, data);
  };

  const handleDragStart = (blockIndex: number) => {
    setDraggedBlockIndex(blockIndex);
  };

  const handleDragEnd = () => {
    setDraggedBlockIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (blockIndex: number) => {
    setDragOverIndex(blockIndex);
  };

  const handleDrop = (dragIndex: number, dropIndex: number) => {
    if (dragIndex !== dropIndex && dragIndex > 0) {
      // Can't move genesis block
      reorderBlocks(dragIndex, dropIndex);
    }
    setDraggedBlockIndex(null);
    setDragOverIndex(null);
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
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              isDragging={draggedBlockIndex === index}
              isDragOver={dragOverIndex === index}
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
