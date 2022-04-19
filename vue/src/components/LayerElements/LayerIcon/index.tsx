import { defineComponent } from 'vue'

import { ILayerIcon } from '@/interfaces'
import { LayerIcon } from '@/types'
import styles from '../index.module.css'

export default defineComponent({
  props: {
    height: {
      type: String,
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
      type: String,
      required: true
    }
  },
  setup({ height, id, name, src, width }: ILayerIcon) {
    return (): JSX.Element => (
      <img id={id} class={styles[id as LayerIcon]} alt={name} height={height} src={src} width={width} />
    )
  }
})
