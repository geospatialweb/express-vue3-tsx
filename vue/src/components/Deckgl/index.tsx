import { Container } from 'typedi'
import { defineComponent, onBeforeMount, onMounted, onUnmounted } from 'vue'

import { IDeckglProp } from '@/interfaces'
import { DataService, DeckglService, HexagonLayerService, ModalService } from '@/services'
import styles from './index.module.css'

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
  setup({ canvas, container }: IDeckglProp) {
    const { deckgl, hexagonLayer } = styles
    const showModal = (): void => {
      const modalService = Container.get(ModalService)
      modalService.showModal()
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
      await getMapboxAccessToken()
      loadHexagonLayer()
    })
    onUnmounted((): void => {
      removeDeckInstance()
      removeMapInstance()
    })
    return (): JSX.Element => (
      <div role="presentation">
        <div id={container} class={deckgl} role="presentation"></div>
        <canvas id={canvas} class={hexagonLayer} role="presentation"></canvas>
      </div>
    )
  }
})
