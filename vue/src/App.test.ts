import { mount } from '@vue/test-utils'
import App from './App'

describe('App component test suite', () => {
  it('will mount and unmount successfully', () => {
    const wrapper = mount(App)
    wrapper.unmount()
  })
})
