import { Container } from 'typedi'
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

import { LayerElementController, TrailController } from '@/controllers'
import { IMapboxProps } from '@/interfaces'
import { DataService, MapService, MapStyleService, MapboxService, MarkerService, ModalService } from '@/services'
import { outdoors, satellite } from './index.module.css'

export default defineComponent({
  props: {
    container: {
      type: String,
      required: true
    }
  },
  setup({ container }: IMapboxProps) {
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
    const addControllerEventListeners = (): void => {
      const layerElementController = Container.get(LayerElementController)
      const trailController = Container.get(TrailController)
      layerElementController.addLayerElementEventListener()
      trailController.addSelectTrailEventListener()
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
    const removeControllerEventListeners = (): void => {
      const layerElementController = Container.get(LayerElementController)
      const trailController = Container.get(TrailController)
      layerElementController.removeLayerElementEventListener()
      trailController.removeSelectTrailEventListener()
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
      addControllerEventListeners()
      await getMapboxAccessToken()
      loadMapLayer()
    })
    onBeforeUnmount((): void => {
      removeControllerEventListeners()
      setHiddenMarkersVisibility()
    })
    onUnmounted((): void => removeMapInstance())
    return (): JSX.Element => <div id={container} class={mapStyle.includes('outdoors') ? outdoors : satellite}></div>
  }
})
