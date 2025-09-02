import React, { createContext, useReducer, useCallback } from 'react';
import type { Block, BlockchainState, Transaction } from '../types/blockchain';
import { BlockchainUtils } from '../utils/blockchain';

type BlockchainAction =
  | { type: 'ADD_BLOCK'; payload: { data: string | Transaction[] } }
  | { type: 'START_MINING'; payload: { blockIndex: number } }
  | { type: 'UPDATE_MINING_PROGRESS'; payload: { blockIndex: number; nonce: number; hash: string } }
  | { type: 'COMPLETE_MINING'; payload: { blockIndex: number; block: Block } }
  | { type: 'SET_DIFFICULTY'; payload: { difficulty: number } }
  | { type: 'SELECT_BLOCK'; payload: { blockIndex: number | null } }
  | { type: 'UPDATE_BLOCK_DATA'; payload: { blockIndex: number; data: string | Transaction[] } }
  | { type: 'VALIDATE_CHAIN' }
  | { type: 'CREATE_FORK'; payload: { fromBlockIndex: number; data: string | Transaction[] } }
  | { type: 'RESET_CHAIN' };

interface BlockchainContextType {
  state: BlockchainState;
  addBlock: (data: string | Transaction[]) => void;
  mineBlock: (blockIndex: number) => void;
  setDifficulty: (difficulty: number) => void;
  selectBlock: (blockIndex: number | null) => void;
  updateBlockData: (blockIndex: number, data: string | Transaction[]) => void;
  createFork: (fromBlockIndex: number, data: string | Transaction[]) => void;
  resetChain: () => void;
}

const initialState: BlockchainState = {
  blocks: [BlockchainUtils.createGenesisBlock()],
  difficulty: 2,
  isValidChain: true,
  selectedBlock: null,
  miningProgress: {}
};

function blockchainReducer(state: BlockchainState, action: BlockchainAction): BlockchainState {
  switch (action.type) {
    case 'ADD_BLOCK': {
      const previousBlock = state.blocks[state.blocks.length - 1];
      const newBlock = BlockchainUtils.createBlock(
        state.blocks.length,
        action.payload.data,
        previousBlock.hash,
        state.difficulty
      );

      // Calculate initial hash for unmined block
      newBlock.hash = BlockchainUtils.calculateHash(
        newBlock.index,
        newBlock.timestamp,
        newBlock.data,
        newBlock.previousHash,
        newBlock.nonce
      );

      const newBlocks = [...state.blocks, newBlock];
      const updatedBlocks = newBlocks.map((block, index) => {
        if (index === 0) {
          return { ...block, isValid: true }; // Genesis block is always valid
        }
        
        const isValidHash = BlockchainUtils.validateBlock(block, newBlocks[index - 1]);
        const isMinedCorrectly = block.difficulty === 0 || 
          (block.isMined && BlockchainUtils.isValidHash(block.hash, block.difficulty));
        
        return {
          ...block,
          isValid: isValidHash && (block.index === 0 || isMinedCorrectly || !block.isMined)
        };
      });

      return {
        ...state,
        blocks: updatedBlocks,
        isValidChain: BlockchainUtils.validateChain(updatedBlocks.filter(b => b.isMined || b.index === 0))
      };
    }

    case 'START_MINING': {
      const blocks = state.blocks.map((block, index) =>
        index === action.payload.blockIndex
          ? { ...block, isMining: true, isMined: false }
          : block
      );

      return {
        ...state,
        blocks,
        miningProgress: {
          ...state.miningProgress,
          [action.payload.blockIndex]: 0
        }
      };
    }

    case 'UPDATE_MINING_PROGRESS': {
      return {
        ...state,
        miningProgress: {
          ...state.miningProgress,
          [action.payload.blockIndex]: action.payload.nonce
        }
      };
    }

    case 'COMPLETE_MINING': {
      const blocks = state.blocks.map((block, index) =>
        index === action.payload.blockIndex ? action.payload.block : block
      );

      // Revalidate all blocks after mining completion
      const updatedBlocks = blocks.map((block, index) => {
        if (index === 0) {
          return { ...block, isValid: true }; // Genesis block is always valid
        }
        
        const isValidHash = BlockchainUtils.validateBlock(block, blocks[index - 1]);
        const isMinedCorrectly = block.difficulty === 0 || 
          (block.isMined && BlockchainUtils.isValidHash(block.hash, block.difficulty));
        
        return {
          ...block,
          isValid: isValidHash && isMinedCorrectly
        };
      });

      return {
        ...state,
        blocks: updatedBlocks,
        isValidChain: BlockchainUtils.validateChain(updatedBlocks),
        miningProgress: {
          ...state.miningProgress,
          [action.payload.blockIndex]: 0
        }
      };
    }

    case 'SET_DIFFICULTY': {
      return {
        ...state,
        difficulty: action.payload.difficulty
      };
    }

    case 'SELECT_BLOCK': {
      return {
        ...state,
        selectedBlock: action.payload.blockIndex
      };
    }

    case 'UPDATE_BLOCK_DATA': {
      const blocks = state.blocks.map((block, index) => {
        if (index === action.payload.blockIndex) {
          const updatedBlock = {
            ...block,
            data: action.payload.data,
            isMined: false,
            nonce: 0
          };
          
          // Recalculate hash without mining
          updatedBlock.hash = BlockchainUtils.calculateHash(
            updatedBlock.index,
            updatedBlock.timestamp,
            updatedBlock.data,
            updatedBlock.previousHash,
            updatedBlock.nonce
          );

          return updatedBlock;
        }
        return block;
      });

      // Invalidate all subsequent blocks and revalidate the chain
      const updatedBlocks = blocks.map((block, index) => {
        if (index === 0) {
          return { ...block, isValid: true }; // Genesis block is always valid
        }
        
        if (index > action.payload.blockIndex) {
          return { ...block, isValid: false, isMined: false };
        }
        
        const isValidHash = BlockchainUtils.validateBlock(block, blocks[index - 1]);
        const isMinedCorrectly = block.difficulty === 0 || 
          (block.isMined && BlockchainUtils.isValidHash(block.hash, block.difficulty));
        
        return {
          ...block,
          isValid: isValidHash && (block.index === 0 || isMinedCorrectly || !block.isMined)
        };
      });

      return {
        ...state,
        blocks: updatedBlocks,
        isValidChain: BlockchainUtils.validateChain(updatedBlocks.filter(b => b.isMined || b.index === 0))
      };
    }

    case 'VALIDATE_CHAIN': {
      const updatedBlocks = state.blocks.map((block, index) => ({
        ...block,
        isValid: index === 0 || BlockchainUtils.validateBlock(block, state.blocks[index - 1])
      }));

      return {
        ...state,
        blocks: updatedBlocks,
        isValidChain: BlockchainUtils.validateChain(updatedBlocks)
      };
    }

    case 'RESET_CHAIN': {
      return {
        ...initialState,
        difficulty: state.difficulty
      };
    }

    default:
      return state;
  }
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export function BlockchainProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(blockchainReducer, initialState);

  const addBlock = useCallback((data: string | Transaction[]) => {
    dispatch({ type: 'ADD_BLOCK', payload: { data } });
  }, []);

  const mineBlock = useCallback(async (blockIndex: number) => {
    const block = state.blocks[blockIndex];
    if (!block || block.isMining || block.isMined) return;

    dispatch({ type: 'START_MINING', payload: { blockIndex } });

    const blockToMine = { ...block };
    const minedBlock = await BlockchainUtils.mineBlock(
      blockToMine,
      (nonce, hash) => {
        dispatch({
          type: 'UPDATE_MINING_PROGRESS',
          payload: { blockIndex, nonce, hash }
        });
      }
    );

    dispatch({
      type: 'COMPLETE_MINING',
      payload: { blockIndex, block: minedBlock }
    });
  }, [state.blocks]);

  const setDifficulty = useCallback((difficulty: number) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: { difficulty } });
  }, []);

  const selectBlock = useCallback((blockIndex: number | null) => {
    dispatch({ type: 'SELECT_BLOCK', payload: { blockIndex } });
  }, []);

  const updateBlockData = useCallback((blockIndex: number, data: string | Transaction[]) => {
    dispatch({ type: 'UPDATE_BLOCK_DATA', payload: { blockIndex, data } });
  }, []);

  const createFork = useCallback((fromBlockIndex: number, data: string | Transaction[]) => {
    // For now, just add a block - fork visualization can be enhanced later
    const previousBlock = state.blocks[fromBlockIndex];
    if (previousBlock) {
      addBlock(data);
    }
  }, [state.blocks, addBlock]);

  const resetChain = useCallback(() => {
    dispatch({ type: 'RESET_CHAIN' });
  }, []);

  return (
    <BlockchainContext.Provider
      value={{
        state,
        addBlock,
        mineBlock,
        setDifficulty,
        selectBlock,
        updateBlockData,
        createFork,
        resetChain
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
}

export { BlockchainContext };
