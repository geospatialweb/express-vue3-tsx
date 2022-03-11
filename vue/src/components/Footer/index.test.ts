import { mount } from '@vue/test-utils'
import { Footer } from '@/components'

describe('Footer component test suite', () => {
  it('will mount and unmount successfully', () => {
    const wrapper = mount(Footer)
    wrapper.unmount()
  })
})
