import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'

import { Header } from '@/components'

describe('Header component test suite', () => {
  let link: HTMLElement
  const setup = () => {
    render(Header)
    link = screen.getByRole('link')
  }

  test('should render logo & text', () => {
    setup()
    const header = screen.getByRole('banner')
    const image = screen.getByRole('img')
    expect(header).toHaveTextContent(/Geospatial Web/)
    expect(header).toHaveTextContent(/Express API - Vue 3 Composition API - TSX/)
    expect(header).toHaveTextContent(/GitLab Repository/)
    expect(image).toBeInTheDocument()
    expect(link).toBeInTheDocument()
  })

  test('repo link works correctly', () => {
    setup()
    expect(link).toHaveAttribute('href', 'https://gitlab.com/geospatialweb/express-vue3-tsx')
  })
})
