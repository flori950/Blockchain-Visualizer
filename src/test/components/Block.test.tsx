import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Block } from '../../components/Block'
import type { Block as BlockType } from '../../types/blockchain'
import { BlockchainProvider } from '../../context/BlockchainContext'

const mockBlock: BlockType = {
  index: 1,
  timestamp: Date.now(),
  data: [
    { id: '1', from: 'Alice', to: 'Bob', amount: 50, timestamp: Date.now() },
    { id: '2', from: 'Bob', to: 'Charlie', amount: 25, timestamp: Date.now() }
  ],
  previousHash: '000abc123def456',
  hash: '000def456ghi789',
  nonce: 12345,
  difficulty: 4,
  isValid: true,
  isMining: false,
  isMined: true
}

const mockGenesisBlock: BlockType = {
  index: 0,
  timestamp: Date.now(),
  data: [],
  previousHash: '0',
  hash: '000genesis123',
  nonce: 0,
  difficulty: 4,
  isValid: true,
  isMining: false,
  isMined: true
}

const mockProps = {
  isSelected: false,
  onSelect: () => {},
  onMine: () => {},
  onUpdateData: () => {}
}

describe('Block Component', () => {
  it('renders a block with correct information', () => {
    render(
      <BlockchainProvider>
        <Block block={mockBlock} {...mockProps} />
      </BlockchainProvider>
    )
    
    expect(screen.getByText('Block #1')).toBeInTheDocument()
    expect(screen.getByText('Hash:')).toBeInTheDocument()
    expect(screen.getByText('Previous Hash:')).toBeInTheDocument()
    expect(screen.getByText('Nonce:')).toBeInTheDocument()
  })

  it('displays genesis block correctly', () => {
    render(
      <BlockchainProvider>
        <Block block={mockGenesisBlock} {...mockProps} />
      </BlockchainProvider>
    )
    
    expect(screen.getByText('Block #0')).toBeInTheDocument()
    expect(screen.getByText('Genesis Block')).toBeInTheDocument()
  })

  it('shows transactions as JSON data', () => {
    render(
      <BlockchainProvider>
        <Block block={mockBlock} {...mockProps} />
      </BlockchainProvider>
    )
    
    // The transactions are displayed as JSON string in the data field
    expect(screen.getByText(/Alice/)).toBeInTheDocument()
    expect(screen.getByText(/Bob/)).toBeInTheDocument()
    expect(screen.getByText(/Charlie/)).toBeInTheDocument()
  })

  it('handles block selection', () => {
    const onSelect = vi.fn()
    render(
      <BlockchainProvider>
        <Block block={mockBlock} {...mockProps} onSelect={onSelect} />
      </BlockchainProvider>
    )
    
    const blockElement = screen.getByText('Block #1')
    fireEvent.click(blockElement)
    expect(onSelect).toHaveBeenCalled()
  })
})
