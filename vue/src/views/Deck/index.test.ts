import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'

import { Deckgl, Footer, HexagonUI, Modal } from '@/components'
import { deckgl } from '@/configuration'
import { Deck as DeckView } from '@/views'

describe('Deck view test suite', () => {
  it('should render successfully', () => {
    render(DeckView)
    const deckView = screen.getAllByRole('presentation')[0]
    expect(deckView).toBeInTheDocument()
  })

  test('Deckgl component renders successfully', () => {
    /* prettier-ignore */
    const { options: { canvas, container } } = deckgl
    render(Deckgl, {
      props: {
        canvas,
        container
      }
    })
    const deckglComponent = screen.getAllByRole('presentation')[0]
    expect(deckglComponent).toBeInTheDocument()
  })

  test('HexagonUI component renders successfully', () => {
    render(HexagonUI)
    const hexagonUI = screen.getAllByRole('presentation')[0]
    expect(hexagonUI).toBeInTheDocument()
  })

  test('Footer component renders successfully', () => {
    render(Footer)
    const footer = screen.getByRole('contentinfo', { name: 'footer' })
    expect(footer).toBeInTheDocument()
  })

  test('Modal component renders successfully', () => {
    render(Modal)
    const modal = screen.getByRole('presentation')
    expect(modal).toBeInTheDocument()
  })

  test('Modal component dynamic class set correctly', () => {
    render(Modal)
    const modal = screen.getByRole('presentation')
    expect(modal.className).toMatch(/active/)
  })
})
