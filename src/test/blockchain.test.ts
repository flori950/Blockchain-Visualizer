import { describe, it, expect } from 'vitest';
import { BlockchainUtils } from '../utils/blockchain';

describe('BlockchainUtils', () => {
  describe('calculateHash', () => {
    it('should generate consistent hashes for same inputs', () => {
      const hash1 = BlockchainUtils.calculateHash(1, 1234567890, 'test data', 'prev_hash', 0);
      const hash2 = BlockchainUtils.calculateHash(1, 1234567890, 'test data', 'prev_hash', 0);
      expect(hash1).toBe(hash2);
    });

    it('should generate different hashes for different inputs', () => {
      const hash1 = BlockchainUtils.calculateHash(1, 1234567890, 'test data', 'prev_hash', 0);
      const hash2 = BlockchainUtils.calculateHash(1, 1234567890, 'different data', 'prev_hash', 0);
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('isValidHash', () => {
    it('should validate hash with correct difficulty', () => {
      const validHash = '000abcd1234567890';
      expect(BlockchainUtils.isValidHash(validHash, 3)).toBe(true);
    });

    it('should reject hash with incorrect difficulty', () => {
      const invalidHash = '00abcd1234567890';
      expect(BlockchainUtils.isValidHash(invalidHash, 3)).toBe(false);
    });
  });

  describe('createGenesisBlock', () => {
    it('should create a valid genesis block', () => {
      const genesis = BlockchainUtils.createGenesisBlock();

      expect(genesis.index).toBe(0);
      expect(genesis.previousHash).toBe('0');
      expect(genesis.data).toBe('Genesis Block');
      expect(genesis.isValid).toBe(true);
      expect(genesis.isMined).toBe(true);
      expect(genesis.hash).toBeDefined();
    });
  });

  describe('createBlock', () => {
    it('should create a block with correct properties', () => {
      const block = BlockchainUtils.createBlock(1, 'test data', 'prev_hash', 2);

      expect(block.index).toBe(1);
      expect(block.data).toBe('test data');
      expect(block.previousHash).toBe('prev_hash');
      expect(block.difficulty).toBe(2);
      expect(block.isMined).toBe(false);
      expect(block.isValid).toBe(false);
    });
  });

  describe('validateBlock', () => {
    it('should validate genesis block', () => {
      const genesis = BlockchainUtils.createGenesisBlock();
      expect(BlockchainUtils.validateBlock(genesis)).toBe(true);
    });

    it('should validate a correctly linked block', () => {
      const genesis = BlockchainUtils.createGenesisBlock();
      const block = BlockchainUtils.createBlock(1, 'test', genesis.hash, 0);
      block.hash = BlockchainUtils.calculateHash(
        block.index,
        block.timestamp,
        block.data,
        block.previousHash,
        block.nonce
      );

      expect(BlockchainUtils.validateBlock(block, genesis)).toBe(true);
    });
  });

  describe('createTransaction', () => {
    it('should create a transaction with valid properties', () => {
      const transaction = BlockchainUtils.createTransaction('Alice', 'Bob', 100);

      expect(transaction.from).toBe('Alice');
      expect(transaction.to).toBe('Bob');
      expect(transaction.amount).toBe(100);
      expect(transaction.id).toBeDefined();
      expect(transaction.timestamp).toBeDefined();
    });
  });
});
