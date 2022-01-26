import { defineComponent } from 'vue'

import { ILayerIcon } from '@/interfaces'
import { LayerIcon } from '@/types'
import LayerElements from '../LayerElements/index.module.css'

export default defineComponent({
  props: {
    height: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  setup({ height, id, name, src, width }: ILayerIcon) {
    return (): JSX.Element => (
      <img
        id={id}
        class={`layer-element ${LayerElements[id as LayerIcon]}`}
        alt={name}
        height={height}
        src={src}
        width={width}
      />
    )
  }
})
