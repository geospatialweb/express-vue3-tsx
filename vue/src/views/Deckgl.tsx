import { defineComponent } from 'vue'

import { Deckgl, Footer, HexagonUI, Modal } from '@/components'
import { deckgl } from '@/configuration'

export default defineComponent({
  setup() {
    /* prettier-ignore */
    const { options: { canvas, container } } = deckgl
    return (): JSX.Element => (
      <>
        <Deckgl canvas={canvas} container={container} />
        <Modal />
        <Footer />
        <HexagonUI />
      </>
    )
  }
})
