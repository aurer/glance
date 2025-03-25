# Glance

A simple portfolio tracker for cryptocurrencies built with React, TypeScript, and Vite. Features include adding, editing, and deleting coins from your portfolio using a modern UI built with shadcn/ui components and styled with Tailwind CSS. State management is handled through Jotai for a lightweight and efficient user experience.

## Features

- 📊 Track your cryptocurrency portfolio across multiple wallets and exchanges
- 💰 Real-time price updates for supported cryptocurrencies
- 📱 Modern, responsive UI built with shadcn/ui components
- 🎨 Clean design with Tailwind CSS
- 🔄 Efficient state management with Jotai
- 🔒 Secure local storage of portfolio data
- 📈 Portfolio performance tracking
- 🎯 Add, edit, and remove cryptocurrencies from your portfolio

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/glance.git
cd glance
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Development

### Project Structure

```
glance/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── store/         # Jotai atoms and state management
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── public/            # Static assets
└── index.html         # Entry HTML file
```

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript type checking

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for the styling
- [Jotai](https://jotai.org/) for state management
- [Vite](https://vitejs.dev/) for the build tool



