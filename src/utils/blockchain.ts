import CryptoJS from 'crypto-js';
import type { Block, Transaction } from '../types/blockchain';

export class BlockchainUtils {
  static calculateHash(
    index: number,
    timestamp: number,
    data: string | Transaction[],
    previousHash: string,
    nonce: number = 0
  ): string {
    const dataString = typeof data === 'string' ? data : JSON.stringify(data);
    return CryptoJS.SHA256(index + timestamp + dataString + previousHash + nonce).toString();
  }

  static isValidHash(hash: string, difficulty: number): boolean {
    const prefix = '0'.repeat(difficulty);
    return hash.substring(0, difficulty) === prefix;
  }

  static async mineBlock(
    block: Block,
    onProgress?: (nonce: number, hash: string) => void
  ): Promise<Block> {
    return new Promise((resolve) => {
      const mine = () => {
        const maxIterations = 1000; // Process in chunks to allow UI updates
        let iterations = 0;

        while (iterations < maxIterations) {
          const hash = this.calculateHash(
            block.index,
            block.timestamp,
            block.data,
            block.previousHash,
            block.nonce
          );

          if (this.isValidHash(hash, block.difficulty)) {
            block.hash = hash;
            block.isMined = true;
            block.isMining = false;
            resolve(block);
            return;
          }

          block.nonce++;
          iterations++;
        }

        // Update progress and continue mining
        if (onProgress) {
          onProgress(block.nonce, block.hash);
        }

        // Continue mining in next tick
        setTimeout(mine, 0);
      };

      mine();
    });
  }

  static validateBlock(block: Block, previousBlock?: Block): boolean {
    // Check if it's the genesis block
    if (block.index === 0) {
      return (
        block.previousHash === '0' &&
        block.hash ===
          this.calculateHash(
            block.index,
            block.timestamp,
            block.data,
            block.previousHash,
            block.nonce
          )
      );
    }

    if (!previousBlock) return false;

    // Check if previous hash matches
    if (block.previousHash !== previousBlock.hash) return false;

    // Check if hash is correct
    const calculatedHash = this.calculateHash(
      block.index,
      block.timestamp,
      block.data,
      block.previousHash,
      block.nonce
    );

    if (block.hash !== calculatedHash) return false;

    // Check if hash meets difficulty requirement
    return this.isValidHash(block.hash, block.difficulty);
  }

  static validateChain(blocks: Block[]): boolean {
    for (let i = 1; i < blocks.length; i++) {
      if (!this.validateBlock(blocks[i], blocks[i - 1])) {
        return false;
      }
    }
    return true;
  }

  static createGenesisBlock(): Block {
    const timestamp = Date.now();
    const block: Block = {
      index: 0,
      timestamp,
      data: 'Genesis Block',
      previousHash: '0',
      hash: '',
      nonce: 0,
      difficulty: 0,
      isValid: true,
      isMining: false,
      isMined: true,
    };

    block.hash = this.calculateHash(
      block.index,
      block.timestamp,
      block.data,
      block.previousHash,
      block.nonce
    );

    return block;
  }

  static createBlock(
    index: number,
    data: string | Transaction[],
    previousHash: string,
    difficulty: number = 1
  ): Block {
    return {
      index,
      timestamp: Date.now(),
      data,
      previousHash,
      hash: '',
      nonce: 0,
      difficulty,
      isValid: false,
      isMining: false,
      isMined: false,
    };
  }

  static generateTransactionId(): string {
    return CryptoJS.lib.WordArray.random(16).toString();
  }

  static createTransaction(from: string, to: string, amount: number): Transaction {
    return {
      id: this.generateTransactionId(),
      from,
      to,
      amount,
      timestamp: Date.now(),
    };
  }
}
