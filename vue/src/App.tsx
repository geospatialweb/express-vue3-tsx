import { Container } from 'typedi'
import { defineComponent, onBeforeMount } from 'vue'

import { Header } from '@/components'
import { AppService, DataService } from '@/services'

export default defineComponent({
  setup() {
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
      <>
        <Header />
        <router-view />
      </>
    )
  }
})
