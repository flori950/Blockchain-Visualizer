import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

// Mock react-helmet-async
vi.mock('react-helmet-async', () => ({
  HelmetProvider: ({ children }: { children: React.ReactNode }) => children,
  Helmet: () => null,
}))

describe('App Component', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('🔗 Blockchain Visualizer')).toBeInTheDocument()
  })

  it('renders the control panel', () => {
    render(<App />)
    expect(screen.getByText('Difficulty Settings')).toBeInTheDocument()
  })

  it('renders the blockchain visualization', () => {
    render(<App />)
    expect(screen.getByText('Blockchain Visualization')).toBeInTheDocument()
  })

  it('renders the 3D visualization', () => {
    render(<App />)
    expect(screen.getByText('🧊 3D Block Visualization')).toBeInTheDocument()
  })

  it('shows the genesis block', () => {
    render(<App />)
    expect(screen.getByText('Block #0')).toBeInTheDocument()
  })
})
