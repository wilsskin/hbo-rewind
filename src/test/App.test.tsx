import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { render, act } from '@testing-library/react'
import App from '@/app/App'

vi.mock('motion/react', async () => {
  const makeMotionComponent = (tag: string) =>
    ({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) =>
      React.createElement(tag, props, children)

  const motion = new Proxy({} as Record<string, ReturnType<typeof makeMotionComponent>>, {
    get: (_, tag: string) => makeMotionComponent(tag),
  })

  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useAnimation: () => ({ start: vi.fn() }),
    useMotionValue: (v: unknown) => ({ get: () => v, set: vi.fn(), onChange: vi.fn() }),
    useTransform: () => ({ get: () => 0, set: vi.fn(), onChange: vi.fn() }),
    useSpring: (v: unknown) => ({ get: () => v, set: vi.fn(), onChange: vi.fn() }),
    useAnimate: () => [null, vi.fn()],
  }
})

describe('App', () => {
  it('renders without crashing', async () => {
    let container!: HTMLElement
    await act(async () => {
      ;({ container } = render(<App />))
    })
    expect(container.firstChild).toBeTruthy()
  })

  it('renders the 393×852 phone frame', async () => {
    let container!: HTMLElement
    await act(async () => {
      ;({ container } = render(<App />))
    })
    const phone = container.querySelector('[class*="w-[393px]"]')
    expect(phone).toBeTruthy()
  })
})
