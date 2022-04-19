import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'

import { Deckgl, Footer, HexagonUI, Modal } from '@/components'
import { deckgl } from '@/configuration'
import { Deckgl as DeckglView } from '@/views'

describe('Deckgl view test suite', () => {
  /* prettier-ignore */
  const { options: { canvas, container } } = deckgl

  it('should render successfully', () => {
    render(DeckglView)
    const deckglView = screen.getAllByRole('presentation')[0]
    expect(deckglView).toBeInTheDocument()
  })

  test('Deckgl component renders successfully', () => {
    render(Deckgl, {
      props: {
        canvas,
        container
      }
    })
    const deckgl = screen.getAllByRole('presentation')[0]
    expect(deckgl).toBeInTheDocument()
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
