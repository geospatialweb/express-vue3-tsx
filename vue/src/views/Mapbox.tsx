import { defineComponent } from 'vue'

import { LayerElements, Mapbox, Modal, Trails } from '@/components'
import { mapbox } from '@/configuration'

export default defineComponent({
  setup() {
    /* prettier-ignore */
    const { options: { container } } = mapbox
    return (): JSX.Element => (
      <>
        <Mapbox container={container} />
        <Modal />
        <LayerElements />
        <Trails />
      </>
    )
  }
})
