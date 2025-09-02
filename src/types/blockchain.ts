export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
}

export interface Block {
  index: number;
  timestamp: number;
  data: string | Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;
  difficulty: number;
  isValid: boolean;
  isMining: boolean;
  isMined: boolean;
}

export interface BlockchainState {
  blocks: Block[];
  difficulty: number;
  isValidChain: boolean;
  selectedBlock: number | null;
  miningProgress: { [key: number]: number };
}

export interface Fork {
  id: string;
  fromBlockIndex: number;
  blocks: Block[];
  isActive: boolean;
}
