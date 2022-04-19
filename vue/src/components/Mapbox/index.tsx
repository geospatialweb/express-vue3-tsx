import { Container } from 'typedi'
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

import { LayerElements } from '@/enums'
import { IMapboxProps } from '@/interfaces'
import { DataService, MapService, MapStyleService, MapboxService, MarkerService, ModalService } from '@/services'
import styles from './index.module.css'

export default defineComponent({
  props: {
    container: {
      type: String,
      required: true
    }
  },
  setup({ container }: IMapboxProps) {
    const { outdoors, satellite } = styles
    const { mapStyle } = Container.get(MapStyleService)
    const showModal = (): void => {
      const modalService = Container.get(ModalService)
      modalService.showModal()
    }
    const setHiddenMarkersVisibility = (): void => {
      const markerService = Container.get(MarkerService)
      mapStyle.includes('outdoors')
        ? setTimeout((): void => markerService.setHiddenMarkersVisibility(), 2000)
        : setTimeout((): void => markerService.setHiddenMarkersVisibility(), 250)
    }
    const getMapboxAccessToken = async (): Promise<void> => {
      const dataService = Container.get(DataService)
      const { mapboxAccessToken } = dataService
      mapboxAccessToken ?? (await dataService.getMapboxAccessToken())
    }
    const loadMapLayer = (): void => {
      const mapService = Container.get(MapService)
      mapService.loadMapLayer()
    }
    const removeLayerVisibilityEventListeners = (): void => {
      const { BIOSPHERE } = LayerElements
      const mapService = Container.get(MapService)
      mapService.removeLayerVisibilityEventListeners(BIOSPHERE)
    }
    const removeMapInstance = (): void => {
      const mapboxService = Container.get(MapboxService)
      mapboxService.removeMapInstance()
    }
    onBeforeMount((): void => {
      showModal()
      setHiddenMarkersVisibility()
    })
    onMounted(async (): Promise<void> => {
      await getMapboxAccessToken()
      loadMapLayer()
    })
    onBeforeUnmount((): void => {
      removeLayerVisibilityEventListeners()
      setHiddenMarkersVisibility()
    })
    onUnmounted((): void => removeMapInstance())
    return (): JSX.Element => (
      <div id={container} class={mapStyle.includes('outdoors') ? outdoors : satellite} role="presentation"></div>
    )
  }
})
