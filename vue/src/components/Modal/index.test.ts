import { mount } from '@vue/test-utils'
import { Modal } from '@/components'

describe('Modal component test suite', () => {
  it('will mount and unmount successfully', () => {
    const wrapper = mount(Modal)
    wrapper.unmount()
  })
})
