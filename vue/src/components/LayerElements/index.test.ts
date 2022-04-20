import userEvent from '@testing-library/user-event'
import { render, screen, within } from '@testing-library/vue'

import { LayerElements } from '@/components'
import { layerElements } from '@/configuration'
import { LayerElements as Layers } from '@/enums'

describe('LayerElements component static test suite', () => {
  let listItems: HTMLElement[]
  const setup = () => {
    render(LayerElements)
    const list = screen.getByTitle('layers')
    listItems = within(list) && screen.getAllByRole('listitem')
  }

  it(`should render list of ${layerElements.length} layers`, () => {
    setup()
    expect(listItems.length).toBe(layerElements.length)
  })

  it('should render list of layers in a specific order', () => {
    setup()
    const layers = listItems.map(({ textContent }) => textContent)
    expect(layers).toEqual(layerElements.map(({ name }) => name))
  })

  it('should render list of layers with icon class set correctly for each layer icon', () => {
    setup()
    const layers = listItems.map(({ firstChild }) => <HTMLElement>firstChild)
    for (const [i, layer] of layers.entries()) {
      expect(layer.className).toMatch(new RegExp(`_${layerElements[i].id}-icon`))
    }
  })

  it("should render list of layers with an initial class 'active' or 'inactive') for each layer", () => {
    setup()
    const layers = listItems.map(({ lastChild }) => <HTMLElement>lastChild)
    for (const [i, layer] of layers.entries()) {
      expect(layer.className).toMatch(new RegExp(`_${layerElements[i].className}`))
    }
  })
})

describe('LayerElements component click event test suite', () => {
  const user = userEvent.setup()

  test("Deck.GL layer class remains 'inactive' when clicked", async () => {
    render(LayerElements)
    const layer = screen.getByText(layerElements[5].name)
    await user.click(layer)
    expect(layer.className).toMatch(/_inactive/)
  })

  test("Biosphere layer class changes to 'inactive' when clicked and 'active' when clicked again", async () => {
    render(LayerElements)
    const layer = screen.getByText(layerElements[1].name)
    await user.click(layer)
    expect(layer.className).toMatch(/_inactive/)
    await user.click(layer)
    expect(layer.className).toMatch(/_active/)
  })

  test("Remaining layers class changes to 'active' when clicked and 'inactive' when clicked again", async () => {
    render(LayerElements)
    for (const { id, name } of layerElements) {
      const { BIOSPHERE, DECKGL } = Layers
      if (id !== BIOSPHERE && id !== DECKGL) {
        const layer = screen.getByText(name)
        await user.click(layer)
        expect(layer.className).toMatch(/_active/)
        await user.click(layer)
        expect(layer.className).toMatch(/_inactive/)
      }
    }
  })
})
