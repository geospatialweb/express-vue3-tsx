import { mount } from '@vue/test-utils'
import { LayerIcon } from '@/components'

describe('LayerIcon component test suite', () => {
  it('will mount and unmount successfully', () => {
    const wrapper = mount(LayerIcon)
    wrapper.unmount()
  })
})
