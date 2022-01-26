import { Container } from 'typedi'
import { defineComponent } from 'vue'

import { AppService } from '@/services'
import { active, inactive } from './index.module.css'

export default defineComponent({
  setup() {
    /* prettier-ignore */
    const { state: { isMobile } } = Container.get(AppService)
    return (): JSX.Element => (
      <footer class={isMobile ? inactive : active} aria-label="Footer">
        <div id="mouse-wheel" aria-labelledby="mouse-wheel">
          Use Mouse Wheel to zoom
        </div>
        <div id="shift-key" aria-labelledby="shift-key">
          Hold down Shift key to rotate map
        </div>
      </footer>
    )
  }
})
