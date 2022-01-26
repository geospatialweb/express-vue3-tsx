import { defineComponent } from 'vue'

import { trails } from '@/configuration'
import { ITrail } from '@/interfaces'
import { trail } from './index.module.css'

export default defineComponent({
  render(): JSX.Element {
    return (
      <select class={`trails ${trail}`} aria-label="Select Trail">
        {trails.map(({ name }: ITrail) => (
          <option key={name} aria-label={name}>
            {name}
          </option>
        ))}
      </select>
    )
  }
})
