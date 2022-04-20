import { render, screen } from '@testing-library/vue'

import { Deckgl } from '@/components'
import { deckgl } from '@/configuration'

describe('Deckgl component test suite', () => {
  /* prettier-ignore */
  const { options: { canvas, container } } = deckgl
  const setup = () => {
    render(Deckgl, {
      props: {
        canvas,
        container
      }
    })
  }

  test('container attributes set correctly', () => {
    setup()
    const el = screen.getAllByRole('presentation')[1]
    expect(el.id).toBe(container)
    expect(el.className).toMatch(new RegExp(container))
  })

  test('canvas attributes set correctly', () => {
    setup()
    const el = screen.getAllByRole('presentation')[2]
    expect(el.id).toBe(canvas)
    expect(el.className).toMatch(/hexagonLayer/)
  })
})
