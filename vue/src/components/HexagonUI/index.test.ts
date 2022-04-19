import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/vue'
import { Container } from 'typedi'

import { HexagonUI } from '@/components'
import { hexagonUIButtons as buttons, hexagonUISliders as sliders, hexagonUIHeading } from '@/configuration'
import { IHexagonLayerProps } from '@/interfaces'
import { HexagonLayerService } from '@/services'

describe('HexagonUI component test suite', () => {
  const setup = () => render(HexagonUI)

  test('heading text set correctly', () => {
    setup()
    const heading = screen.getByRole('heading')
    expect(heading).toHaveTextContent(hexagonUIHeading.text)
  })

  test('label element text set correctly for each parameter', () => {
    setup()
    for (const { id, text } of sliders) {
      const label = screen.getByTestId(id)
      expect(label).toHaveTextContent(text)
    }
  })

  test("label element class initially set to 'mouseout' for each parameter", () => {
    setup()
    for (const { text } of sliders) {
      const label = screen.getByText(text)
      expect(label.className).toMatch(/_mouseout/)
    }
  })

  test('label element class set correctly during mouseover on input element for each parameter', async () => {
    setup()
    for (const [i, { text }] of sliders.entries()) {
      const label = screen.getByText(text)
      const slider = screen.getAllByRole('slider')[i]
      await fireEvent.mouseOver(slider)
      expect(label.className).toMatch(/_mouseover/)
    }
  })

  test('label element class set correctly during mouseout on input element for each parameter', async () => {
    setup()
    for (const [i, { text }] of sliders.entries()) {
      const label = screen.getByText(text)
      const slider = screen.getAllByRole('slider')[i]
      await fireEvent.mouseOut(slider)
      expect(label.className).toMatch(/_mouseout/)
    }
  })

  test('input element attributes set correctly for each parameter', () => {
    setup()
    for (const [i, { id, max, min, step }] of sliders.entries()) {
      const slider = screen.getAllByRole('slider')[i]
      expect(slider).toHaveAttribute('id', id)
      expect(slider).toHaveAttribute('max', max)
      expect(slider).toHaveAttribute('min', min)
      expect(slider).toHaveAttribute('step', step)
    }
  })

  test('input element initial display value set correctly for each parameter', () => {
    setup()
    const { state } = Container.get(HexagonLayerService)
    for (const [i, { id }] of sliders.entries()) {
      const slider = screen.getAllByRole('slider')[i]
      expect(slider).toHaveDisplayValue(String(state[id as keyof IHexagonLayerProps]))
    }
  })

  it('should display correct input element display value when slider value changes', async () => {
    setup()
    const values = ['0.5', '0', '5000', '80']
    for (const [i] of sliders.entries()) {
      const slider = screen.getAllByRole('slider')[i]
      await fireEvent.update(slider, values[i])
      expect(slider).toHaveDisplayValue(values[i])
    }
  })

  test('button id attribute set correctly', () => {
    setup()
    for (const [i, { id }] of buttons.entries()) {
      const button = screen.getAllByRole('button')[i]
      expect(button).toHaveAttribute('id', id)
    }
  })

  test('button text set correctly', () => {
    setup()
    for (const [i, { text }] of buttons.entries()) {
      const button = screen.getAllByRole('button')[i]
      expect(button).toHaveTextContent(text)
    }
  })
})
