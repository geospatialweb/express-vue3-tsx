import { defineComponent } from 'vue'

import { Deckgl, Footer, HexagonUI, Modal } from '@/components'
import { deckgl } from '@/configuration'
import styles from './index.module.css'

export default defineComponent({
  setup() {
    /* prettier-ignore */
    const { options: { canvas, container } } = deckgl
    return (): JSX.Element => (
      <div class={styles.deckgl} role="presentation">
        <Deckgl canvas={canvas} container={container} />
        <HexagonUI />
        <Footer />
        <Modal />
      </div>
    )
  }
})
