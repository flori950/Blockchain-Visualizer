# 🔗 Blockchain Visualizer

An interactive blockchain visualizer that demonstrates how blockchains work with proof-of-work mining, chain validation, and transaction handling. Perfect for learning blockchain concepts!

## 🌟 Features

### Core Features (MVP)

- **Genesis Block**: Automatically created as the first block in the chain
- **Add Block**: User can enter data (text or JSON) to create new blocks
- **Live Hash Calculation**: Each block's hash is recalculated when data or previous hash changes
- **Chain Validation**: Visual indication when blocks become invalid (turn red)

### Extended Features

- **Proof-of-Work Simulation**: Adjustable difficulty slider (1-5 zeros)
- **Mining Progress**: Real-time nonce counter and progress visualization
- **Transaction Support**: Create blocks with multiple transactions instead of raw text
- **Interactive UI**: Click blocks to edit data, mine individual blocks
- **Chain Status**: Real-time validation of the entire blockchain

## 🚀 Live Demo

Visit the live demo: [https://blockchain.florian-hunter.de//blockchain/](https://blockchain.florian-hunter.de//blockchain/)

## 🛠️ Technologies Used

- **React 19** with TypeScript
- **Vite** for fast development and building
- **CryptoJS** for SHA-256 hashing
- **CSS3** with modern animations and responsive design
- **GitHub Actions** for automated FTP deployment
- **Renovate** for dependency management

## 📦 Installation & Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/flori950/blockchain-visualizer.git
cd blockchain-visualizer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 How to Use

1. **Start with Genesis**: The blockchain starts with a pre-created genesis block
2. **Add New Blocks**: Use the control panel to add new blocks with custom data
3. **Choose Data Type**: Switch between text data and transaction lists
4. **Adjust Difficulty**: Use the slider to change mining difficulty (1-5 zeros)
5. **Mine Blocks**: Click the "Mine" button to start proof-of-work mining
6. **Edit Block Data**: Click on any block to edit its data and see chain invalidation
7. **Validate Chain**: Watch real-time validation as the chain updates

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Block.tsx       # Individual block component
│   ├── BlockchainVisualization.tsx
│   ├── ControlPanel.tsx
│   ├── Footer.tsx
│   └── SEO.tsx
├── context/            # React context for state management
│   └── BlockchainContext.tsx
├── types/              # TypeScript type definitions
│   └── blockchain.ts
├── utils/              # Utility functions
│   └── blockchain.ts   # Core blockchain logic
└── App.tsx            # Main application component
```

## 🧪 Testing

The project includes comprehensive testing with **62% code coverage**:

- **24 tests** covering components, utilities, and integration
- **Vitest** with @testing-library/react for modern testing
- **Coverage reports** with HTML and text output
- **Pre-commit hooks** with lint-staged and commitlint

```bash
npm test              # Run tests in watch mode
npm run test:coverage # Generate coverage report
npm run test:ui       # Interactive test UI
```

## 🔍 Key Concepts Demonstrated

- **Hash Functions**: SHA-256 cryptographic hashing
- **Proof of Work**: Mining with adjustable difficulty
- **Chain Integrity**: How changing one block affects the entire chain
- **Block Structure**: Index, timestamp, data, previous hash, hash, nonce
- **Mining Process**: Nonce iteration until valid hash is found
- **Transactions**: Structured data within blocks

## 🤝 Contributing

Contributions are welcome! Please follow our development practices:

### Development Workflow

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes with tests
4. Run the test suite (`npm test`)
5. Commit with conventional format (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Code Quality

- **ESLint** + **Prettier** for consistent code style
- **TypeScript** for type safety
- **Husky** pre-commit hooks for automated quality checks
- **Conventional Commits** for clear commit messages
- **Test coverage** requirements for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**flori950**

- GitHub: [@flori950](https://github.com/flori950)
- LinkedIn: [Florian Jager](https://www.linkedin.com/in/florian-jager/)

⭐ Star this repository if you found it helpful!
