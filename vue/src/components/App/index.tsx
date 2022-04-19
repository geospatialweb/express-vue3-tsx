import { Container } from 'typedi'
import { defineComponent, onBeforeMount } from 'vue'

import { Header } from '@/components'
import { AppService, DataService } from '@/services'
import styles from './index.module.css'

export default defineComponent({
  setup() {
    const { app } = styles
    const setInitialZoom = (): void => {
      const appService = Container.get(AppService)
      appService.setInitialZoom()
    }
    const loadData = async (): Promise<void> => {
      const dataService = Container.get(DataService)
      await dataService.loadData()
    }
    onBeforeMount(async (): Promise<void> => {
      setInitialZoom()
      await loadData()
    })
    return (): JSX.Element => (
      <div class={app} role="presentation">
        <Header />
        <router-view />
      </div>
    )
  }
})
