import { defineComponent } from 'vue'

import { ILayerElement } from '@/interfaces'
import { active, inactive } from '../LayerElements/index.module.css'

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
    const jsx = ({ id, isActive, name }: ILayerElement): JSX.Element => (
      <div id={id} class={isActive ? active : inactive} aria-label={name}>
        {name}
      </div>
    )
    return (): JSX.Element => jsx(props)
  }
})
