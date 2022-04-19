import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'

import { Footer } from '@/components'

describe('Footer component test suite', () => {
  let footer: HTMLElement
  const setup = (): void => {
    render(Footer)
    footer = screen.getByRole('contentinfo', { name: 'footer' })
  }

  it('should render successfully', () => {
    setup()
    expect(footer).toBeInTheDocument()
  })

  test('class set correctly to "active"', () => {
    setup()
    expect(footer.className).toMatch(/_active/)
  })

  test('text displays correctly', () => {
    setup()
    expect(footer).toHaveTextContent('Use Mouse Wheel to zoom in/out Hold down Shift key to rotate map')
  })
})
