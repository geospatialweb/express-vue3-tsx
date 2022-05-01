import { Container } from 'typedi'
import { defineComponent } from 'vue'

import { trails } from '@/configuration'
import { ITrail } from '@/interfaces'
import { TrailService } from '@/services'
import styles from './index.module.css'

export default defineComponent({
  setup() {
    const { trail } = styles
    const onChangeController = (evt: Event): void => {
      evt.stopPropagation()
      const { value: name } = evt.target as HTMLSelectElement
      const trailService = Container.get(TrailService)
      trailService.selectTrail(name)
    }
    return (): JSX.Element => (
      <label>
        Select Trail
        <select id="trail" class={trail} onChange={(evt): void => onChangeController(evt)}>
          <option>Select Trail</option>
          {trails.map(({ name }: ITrail) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </label>
    )
  }
})
