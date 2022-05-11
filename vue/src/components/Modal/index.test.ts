import { render, screen } from '@testing-library/vue'

import { Modal } from '@/components'

describe('Modal component test suite', () => {
  test('dynamic class set correctly', () => {
    render(Modal)
    const modal = screen.getByRole('presentation')
    expect(modal.className).toMatch(/inactive/)
  })
})
