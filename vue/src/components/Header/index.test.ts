import { mount } from '@vue/test-utils'
import { Header } from '@/components'

describe('Header component test suite', () => {
  it('will mount and unmount successfully', () => {
    const wrapper = mount(Header)
    wrapper.unmount()
  })

  test('Should render', () => {
    const wrapper = mount(Header)
    expect(wrapper.find('#name').text()).toBe('Geospatial Web')
    expect(wrapper.find('a').text()).toBe('GitLab Repository')
    expect(wrapper.find('#title').isVisible())
    expect(wrapper.find('img').isVisible())
  })
})
