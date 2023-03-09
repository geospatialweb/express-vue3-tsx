import { Container } from 'typedi'
import { defineComponent } from 'vue'

import { IApp } from '@/interfaces'
import { AppService } from '@/services'
import styles from './index.module.css'

export default defineComponent({
  setup() {
    const { active, inactive } = styles
    const getAppState = (): IApp => {
      const { state } = Container.get(AppService)
      return state
    }
    const jsx = ({ isMobile }: IApp): JSX.Element => (
      <footer class={isMobile ? inactive : active} aria-label="footer">
        <p>Use Mouse Wheel to zoom in/out Hold down Shift key to rotate map</p>
      </footer>
    )
    return (): JSX.Element => jsx(getAppState())
  }
})
