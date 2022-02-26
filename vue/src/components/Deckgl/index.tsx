import { Container } from 'typedi'
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

import { HexagonLayerController } from '@/controllers'
import { IDeckglProps } from '@/interfaces'
import { DataService, DeckglService, HexagonLayerService, ModalService } from '@/services'
import { deckgl, hexagonLayer } from './index.module.css'

export default defineComponent({
  props: {
    canvas: {
      type: String,
      required: true
    },
    container: {
      type: String,
      required: true
    }
  },
  setup({ canvas, container }: IDeckglProps) {
    const showModal = (): void => {
      const modalService = Container.get(ModalService)
      modalService.showModal()
    }
    const addControllerEventListeners = (): void => {
      const hexagonLayerController = Container.get(HexagonLayerController)
      hexagonLayerController.addHexagonLayerEventListeners()
    }
    const getMapboxAccessToken = async (): Promise<void> => {
      const dataService = Container.get(DataService)
      const { mapboxAccessToken } = dataService
      mapboxAccessToken ?? (await dataService.getMapboxAccessToken())
    }
    const loadHexagonLayer = (): void => {
      const hexagonLayerService = Container.get(HexagonLayerService)
      hexagonLayerService.loadHexagonLayer()
    }
    const removeControllerEventListeners = (): void => {
      const hexagonLayerController = Container.get(HexagonLayerController)
      hexagonLayerController.removeHexagonLayerEventListeners()
    }
    const removeDeckInstance = (): void => {
      const deckglService = Container.get(DeckglService)
      deckglService.removeDeckInstance()
    }
    const removeMapInstance = (): void => {
      const deckglService = Container.get(DeckglService)
      deckglService.removeMapInstance()
    }
    onBeforeMount((): void => showModal())
    onMounted(async (): Promise<void> => {
      addControllerEventListeners()
      await getMapboxAccessToken()
      loadHexagonLayer()
    })
    onBeforeUnmount((): void => removeControllerEventListeners())
    onUnmounted((): void => {
      removeDeckInstance()
      removeMapInstance()
    })
    return (): JSX.Element => (
      <>
        <div id={container} class={deckgl}></div>
        <canvas id={canvas} class={hexagonLayer}></canvas>
      </>
    )
  }
})
