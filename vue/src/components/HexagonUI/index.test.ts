import { mount } from '@vue/test-utils'
import { HexagonUI } from '@/components'

describe('HexagonUI component test suite', () => {
  it('will mount and unmount successfully', () => {
    const wrapper = mount(HexagonUI)
    wrapper.unmount()
  })
})
