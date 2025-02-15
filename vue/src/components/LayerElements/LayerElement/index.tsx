import { defineComponent } from 'vue'

import { ILayerElement } from '@/interfaces'
import styles from '../index.module.css'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props: ILayerElement) {
    const { active, inactive } = styles
    const jsx = ({ id, isActive, name }: ILayerElement): JSX.Element => (
      <div id={id} class={isActive ? active : inactive}>
        {name}
      </div>
    )
    return (): JSX.Element => jsx(props)
  }
})
