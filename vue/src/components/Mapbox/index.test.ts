import { render, screen } from '@testing-library/vue'

import { Mapbox } from '@/components'
import { mapbox } from '@/configuration'

describe('Mapbox component test suite', () => {
  test('attributes set correctly', () => {
    /* prettier-ignore */
    const { options: { container } } = mapbox
    render(Mapbox, {
      props: {
        container
      }
    })
    const el = screen.getByRole('presentation')
    expect(el.id).toBe(container)
    expect(el.className).toMatch(new RegExp(container))
    expect(el.className).toMatch(/outdoors/)
  })
})
