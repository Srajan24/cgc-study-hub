import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Cleanup after each test case
afterEach(() => {
  cleanup()
})

// Mock window.puter for ChatBot tests
global.window.puter = {
  ai: {
    chat: vi.fn().mockResolvedValue({
      output: 'Mock AI response',
      text: 'Mock AI response',
      message: 'Mock AI response'
    })
  }
}

// Mock PDF.js worker
vi.mock('pdfjs-dist/build/pdf.worker.min.mjs?url', () => ({
  default: 'mock-worker-url'
}))

// Mock Lottie Player
vi.mock('@lottiefiles/react-lottie-player', () => ({
  Player: ({ src, ...props }) => (
    <div data-testid="lottie-player" data-src={src} {...props}>
      Lottie Animation
    </div>
  )
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>
  },
  AnimatePresence: ({ children }) => children
}))

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/' })
}))
