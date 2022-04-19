import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'

import { LayerElements, Mapbox, Modal, Trails } from '@/components'
import { mapbox } from '@/configuration'
import { Mapbox as MapboxView } from '@/views'

describe('Mapbox view test suite', () => {
  /* prettier-ignore */
  const { options: { container } } = mapbox

  it('should render successfully', () => {
    render(MapboxView)
    const mapboxView = screen.getAllByRole('presentation')[0]
    expect(mapboxView).toBeInTheDocument()
  })

  test('Mapbox component renders successfully', () => {
    render(Mapbox, {
      props: {
        container
      }
    })
    const mapbox = screen.getByRole('presentation')
    expect(mapbox).toBeInTheDocument()
  })

  test('LayerElements component renders successfully', () => {
    render(LayerElements)
    const list = screen.getByTitle('layers')
    expect(list).toBeInTheDocument()
  })

  test('Trails component renders successfully', () => {
    render(Trails)
    const trails = screen.getByLabelText('Select Trail')
    expect(trails).toBeInTheDocument()
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
