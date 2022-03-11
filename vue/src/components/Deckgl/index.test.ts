import { mount } from '@vue/test-utils'
import { Deckgl } from '@/components'

describe('Deckgl component test suite', () => {
  it('will mount and unmount successfully', () => {
    const wrapper = mount(Deckgl)
    wrapper.unmount()
  })
})
