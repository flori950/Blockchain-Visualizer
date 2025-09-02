import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ControlPanel } from '../../components/ControlPanel';
import { BlockchainProvider } from '../../context/BlockchainContext';

describe('ControlPanel Component', () => {
  it('renders difficulty settings', () => {
    render(
      <BlockchainProvider>
        <ControlPanel />
      </BlockchainProvider>
    );

    expect(screen.getByText('Difficulty Settings')).toBeInTheDocument();
    expect(screen.getByText(/Mining Difficulty:/)).toBeInTheDocument();
  });

  it('renders add block button', () => {
    render(
      <BlockchainProvider>
        <ControlPanel />
      </BlockchainProvider>
    );

    expect(screen.getByRole('button', { name: /Add Block/i })).toBeInTheDocument();
  });

  it('renders validate chain button', () => {
    render(
      <BlockchainProvider>
        <ControlPanel />
      </BlockchainProvider>
    );

    expect(screen.getByRole('button', { name: /Reset Chain/i })).toBeInTheDocument();
  });

  it('displays basic controls', () => {
    render(
      <BlockchainProvider>
        <ControlPanel />
      </BlockchainProvider>
    );

    expect(screen.getByText('Text Data')).toBeInTheDocument();
    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter block data...')).toBeInTheDocument();
  });

  it('shows chain statistics', () => {
    render(
      <BlockchainProvider>
        <ControlPanel />
      </BlockchainProvider>
    );

    expect(screen.getByText(/Total Blocks:/)).toBeInTheDocument();
    expect(screen.getByText(/Mined Blocks:/)).toBeInTheDocument();
    expect(screen.getByText(/Chain Validity:/)).toBeInTheDocument();
  });

  it('allows difficulty adjustment', () => {
    render(
      <BlockchainProvider>
        <ControlPanel />
      </BlockchainProvider>
    );

    const difficultySlider = screen.getByRole('slider');
    expect(difficultySlider).toBeInTheDocument();

    fireEvent.change(difficultySlider, { target: { value: '3' } });
    expect(screen.getByText(/Mining Difficulty:\s*3/)).toBeInTheDocument();
  });
});
