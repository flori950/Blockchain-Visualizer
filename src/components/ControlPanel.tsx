import { useState } from 'react';
import { useBlockchain } from '../hooks/useBlockchain';
import { BlockchainUtils } from '../utils/blockchain';
import type { Transaction } from '../types/blockchain';
import './ControlPanel.css';

export function ControlPanel() {
  const { state, addBlock, setDifficulty, resetChain } = useBlockchain();
  const [newBlockData, setNewBlockData] = useState('');
  const [dataMode, setDataMode] = useState<'text' | 'transactions'>('text');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTransaction, setNewTransaction] = useState({
    from: '',
    to: '',
    amount: 0
  });

  const handleAddBlock = () => {
    if (dataMode === 'text' && newBlockData.trim()) {
      addBlock(newBlockData.trim());
      setNewBlockData('');
    } else if (dataMode === 'transactions' && transactions.length > 0) {
      addBlock([...transactions]);
      setTransactions([]);
    }
  };

  const handleAddTransaction = () => {
    if (newTransaction.from && newTransaction.to && newTransaction.amount > 0) {
      const transaction = BlockchainUtils.createTransaction(
        newTransaction.from,
        newTransaction.to,
        newTransaction.amount
      );
      setTransactions([...transactions, transaction]);
      setNewTransaction({ from: '', to: '', amount: 0 });
    }
  };

  const removeTransaction = (index: number) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  return (
    <div className="control-panel">
      <div className="panel-section">
        <h3>Difficulty Settings</h3>
        <div className="difficulty-controls">
          <label htmlFor="difficulty">Mining Difficulty: {state.difficulty}</label>
          <input
            id="difficulty"
            type="range"
            min="1"
            max="5"
            value={state.difficulty}
            onChange={(e) => setDifficulty(parseInt(e.target.value))}
          />
          <span className="difficulty-help">
            Higher difficulty requires more leading zeros in hash
          </span>
        </div>
      </div>

      <div className="panel-section">
        <h3>Add New Block</h3>
        
        <div className="data-mode-selector">
          <label>
            <input
              type="radio"
              value="text"
              checked={dataMode === 'text'}
              onChange={(e) => setDataMode(e.target.value as 'text')}
            />
            Text Data
          </label>
          <label>
            <input
              type="radio"
              value="transactions"
              checked={dataMode === 'transactions'}
              onChange={(e) => setDataMode(e.target.value as 'transactions')}
            />
            Transactions
          </label>
        </div>

        {dataMode === 'text' ? (
          <div className="text-input-section">
            <textarea
              value={newBlockData}
              onChange={(e) => setNewBlockData(e.target.value)}
              placeholder="Enter block data..."
              rows={3}
            />
            <button 
              onClick={handleAddBlock}
              disabled={!newBlockData.trim()}
              className="add-block-btn"
            >
              Add Block
            </button>
          </div>
        ) : (
          <div className="transaction-input-section">
            <div className="transaction-form">
              <input
                type="text"
                placeholder="From address"
                value={newTransaction.from}
                onChange={(e) => setNewTransaction({...newTransaction, from: e.target.value})}
              />
              <input
                type="text"
                placeholder="To address"
                value={newTransaction.to}
                onChange={(e) => setNewTransaction({...newTransaction, to: e.target.value})}
              />
              <input
                type="number"
                placeholder="Amount"
                value={newTransaction.amount || ''}
                onChange={(e) => setNewTransaction({...newTransaction, amount: parseFloat(e.target.value) || 0})}
                min="0"
                step="0.01"
              />
              <button 
                onClick={handleAddTransaction}
                disabled={!newTransaction.from || !newTransaction.to || newTransaction.amount <= 0}
                className="add-transaction-btn"
              >
                Add Transaction
              </button>
            </div>

            {transactions.length > 0 && (
              <div className="transaction-list">
                <h4>Pending Transactions ({transactions.length})</h4>
                {transactions.map((tx, index) => (
                  <div key={tx.id} className="transaction-item">
                    <span>{tx.from} → {tx.to}: {tx.amount}</span>
                    <button onClick={() => removeTransaction(index)}>×</button>
                  </div>
                ))}
                <button 
                  onClick={handleAddBlock}
                  className="add-block-btn"
                >
                  Add Block with Transactions
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="panel-section">
        <h3>Chain Actions</h3>
        <div className="chain-actions">
          <button onClick={resetChain} className="reset-btn">
            Reset Chain
          </button>
          <div className="chain-stats">
            <div>Total Blocks: {state.blocks.length}</div>
            <div>
              Mined Blocks: {state.blocks.filter(b => b.isMined).length}
            </div>
            <div>
              Mining: {state.blocks.filter(b => b.isMining).length}
            </div>
          </div>
        </div>
      </div>

      <div className="panel-section">
        <h3>Chain Status</h3>
        <div className="status-info">
          <div className={`status-item ${state.isValidChain ? 'valid' : 'invalid'}`}>
            Chain Validity: {state.isValidChain ? 'Valid' : 'Invalid'}
          </div>
          <div className="status-item">
            Current Difficulty: {state.difficulty} zeros required
          </div>
        </div>
      </div>
    </div>
  );
}
