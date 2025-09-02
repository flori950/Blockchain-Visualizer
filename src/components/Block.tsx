import React, { useState } from 'react';
import type { Block as BlockType } from '../types/blockchain';
import { useBlockchain } from '../hooks/useBlockchain';
import './Block.css';

interface BlockProps {
  block: BlockType;
  isSelected: boolean;
  onSelect: () => void;
  onMine: () => void;
  onUpdateData: (data: string) => void;
  onDragStart?: (index: number) => void;
  onDragEnd?: () => void;
  onDragOver?: (index: number) => void;
  onDrop?: (dragIndex: number, dropIndex: number) => void;
  isDragging?: boolean;
  isDragOver?: boolean;
}

export function Block({
  block,
  isSelected,
  onSelect,
  onMine,
  onUpdateData,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  isDragging = false,
  isDragOver = false,
}: BlockProps) {
  const { state } = useBlockchain();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const miningProgress = state.miningProgress[block.index] || 0;
  const isGenesis = block.index === 0;

  const getBlockClass = () => {
    let className = 'block';
    if (isSelected) className += ' selected';
    if (isDragging) className += ' dragging';
    if (isDragOver) className += ' drag-over';
    if (block.isMining) className += ' mining';
    else if (block.isMined && block.isValid) className += ' valid mined';
    else if (block.isMined && !block.isValid) className += ' invalid mined';
    else if (!block.isMined && block.index > 0) className += ' unmined';
    else if (!block.isValid) className += ' invalid';
    return className;
  };

  const getBlockStatus = () => {
    if (block.index === 0) return 'Genesis Block';
    if (block.isMining) return 'Mining...';
    if (block.isMined && block.isValid) return 'Mined & Valid';
    if (block.isMined && !block.isValid) return 'Mined but Invalid';
    if (!block.isMined) return 'Needs Mining';
    return 'Invalid';
  };

  const getStatusColor = () => {
    if (block.index === 0) return '#6c757d';
    if (block.isMining) return '#ff9500';
    if (block.isMined && block.isValid) return '#28a745';
    if (block.isMined && !block.isValid) return '#dc3545';
    if (!block.isMined) return '#007acc';
    return '#dc3545';
  };

  const handleDataChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateData(event.target.value);
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (isGenesis) {
      e.preventDefault();
      return;
    }
    setDraggedIndex(block.index);
    onDragStart?.(block.index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', block.index.toString());
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    onDragEnd?.();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOver?.(block.index);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex !== block.index && onDrop) {
      onDrop(dragIndex, block.index);
    }
  };

  const formatData = () => {
    if (typeof block.data === 'string') {
      return block.data;
    }
    return JSON.stringify(block.data, null, 2);
  };

  const formatHash = (hash: string) => {
    if (hash.length > 16) {
      return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
    }
    return hash;
  };

  return (
    <div
      className={getBlockClass()}
      onClick={onSelect}
      draggable={!isGenesis}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{ cursor: isGenesis ? 'pointer' : 'grab' }}
    >
      <div className="block-header">
        <h3>Block #{block.index}</h3>
        <div className="block-status" style={{ color: getStatusColor() }}>
          {getBlockStatus()}
        </div>
        {!isGenesis && (
          <span className="drag-indicator" title="Drag to reorder">
            ⋮⋮
          </span>
        )}
        {block.index > 0 && (
          <button
            className={`mine-button ${block.isMined ? 'mined' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onMine();
            }}
            disabled={block.isMining || block.isMined}
          >
            {block.isMining ? `Mining... (${miningProgress})` : block.isMined ? 'Mined ✓' : 'Mine'}
          </button>
        )}
      </div>

      <div className="block-content">
        <div className="field">
          <label>Index:</label>
          <span>{block.index}</span>
        </div>

        <div className="field">
          <label>Timestamp:</label>
          <span>{new Date(block.timestamp).toLocaleTimeString()}</span>
        </div>

        <div className="field">
          <label>Data:</label>
          {isSelected ? (
            <textarea
              value={formatData()}
              onChange={handleDataChange}
              onClick={(e) => e.stopPropagation()}
              rows={3}
              disabled={block.index === 0}
            />
          ) : (
            <span className="data-preview">{formatData()}</span>
          )}
        </div>

        <div className="field">
          <label>Previous Hash:</label>
          <span className="hash">{formatHash(block.previousHash)}</span>
        </div>

        <div className="field">
          <label>Hash:</label>
          <span className={`hash ${block.isMined && block.isValid ? 'valid-hash' : ''}`}>
            {formatHash(block.hash)}
          </span>
        </div>

        <div className="field">
          <label>Nonce:</label>
          <span className={block.isMining ? 'nonce-counting' : ''}>{block.nonce}</span>
        </div>

        {block.difficulty > 0 && (
          <div className="field">
            <label>Difficulty:</label>
            <span>
              {block.difficulty} (requires {block.difficulty} leading zeros)
            </span>
          </div>
        )}
      </div>

      {block.isMining && (
        <div className="mining-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min((miningProgress % 10000) / 100, 100)}%` }}
            />
          </div>
          <span>Nonce: {miningProgress}</span>
        </div>
      )}

      <div className={`validity-indicator ${block.isValid ? 'valid' : 'invalid'}`}>
        {block.index === 0
          ? '🔗 Genesis'
          : block.isMining
            ? '⚡ Mining'
            : block.isMined && block.isValid
              ? '✅ Valid'
              : block.isMined && !block.isValid
                ? '❌ Invalid'
                : '⏳ Unmined'}
      </div>
    </div>
  );
}
