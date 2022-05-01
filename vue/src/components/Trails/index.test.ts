import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'

import { Trails } from '@/components'
import { trails } from '@/configuration'

describe('Trails component test suite', () => {
  const setup = () => render(Trails)
  const names = <string[]>trails.map((trail) => Object.values(trail)[0])

  it('should display the correct number of options', () => {
    setup()
    const options: HTMLOptionElement[] = screen.getAllByRole('option')
    expect(options.length).toBe(trails.length + 1)
  })

  it('should set default option correctly', () => {
    setup()
    const option: HTMLOptionElement = screen.getByRole('option', { name: 'Select Trail' })
    expect(option.selected).toBe(true)
  })

  it.each(names)("should allow user to select '%s' trail", async (name) => {
    setup()
    const select: HTMLSelectElement = screen.getByLabelText('Select Trail')
    const option: HTMLOptionElement = screen.getByRole('option', { name })
    expect(option).toHaveValue(name)
    await userEvent.selectOptions(select, option)
    expect(option.selected).toBe(true)
  })
})
