import { useContext } from 'react';
import { BlockchainContext } from '../context/BlockchainContext';

export function useBlockchain() {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
}
