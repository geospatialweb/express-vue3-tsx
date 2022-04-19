import { Container } from 'typedi'
import { defineComponent } from 'vue'

import { AppService } from '@/services'
import styles from './index.module.css'

export default defineComponent({
  setup() {
    const { active, inactive } = styles
    /* prettier-ignore */
    const { state: { isMobile } } = Container.get(AppService)
    return (): JSX.Element => (
      <footer class={isMobile ? inactive : active} aria-label="footer">
        <p>Use Mouse Wheel to zoom in/out Hold down Shift key to rotate map</p>
      </footer>
    )
  }
})
