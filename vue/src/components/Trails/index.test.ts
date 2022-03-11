import { mount } from '@vue/test-utils'
import { Trails } from '@/components'

describe('Trails component test suite', () => {
  it('will mount and unmount successfully', () => {
    const wrapper = mount(Trails)
    wrapper.unmount()
  })
})
