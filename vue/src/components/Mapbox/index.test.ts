import { mount } from '@vue/test-utils'
import { Mapbox } from '@/components'

describe('Mapbox component test suite', () => {
  it('will mount and unmount successfully', () => {
    const wrapper = mount(Mapbox)
    wrapper.unmount()
  })
})
