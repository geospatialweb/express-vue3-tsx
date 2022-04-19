import { render, screen } from '@testing-library/vue'

import { Deckgl } from '@/components'
import { deckgl } from '@/configuration'

describe('Deckgl component test suite', () => {
  test('attributes set correctly', () => {
    /* prettier-ignore */
    const { options: { canvas, container } } = deckgl
    render(Deckgl, {
      props: {
        canvas,
        container
      }
    })
    const deckglContainer = screen.getAllByRole('presentation')[1]
    expect(deckglContainer.id).toBe(container)
    expect(deckglContainer.className).toMatch(new RegExp(container))
    const deckglCanvas = screen.getAllByRole('presentation')[2]
    expect(deckglCanvas.id).toBe(canvas)
    expect(deckglCanvas.className).toMatch(/hexagonLayer/)
  })
})
