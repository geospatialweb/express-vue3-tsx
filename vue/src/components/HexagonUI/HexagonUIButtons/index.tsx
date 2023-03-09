import { Container } from 'typedi'
import { defineComponent } from 'vue'

import { hexagonUIButtons as buttons } from '@/configuration'
import { HexagonLayerService, RouterService } from '@/services'

export default defineComponent({
  setup() {
    const onClickHandler = (evt: MouseEvent): void => {
      evt.stopPropagation()
      const { id } = evt.target as HTMLButtonElement
      const hexagonLayerService = Container.get(HexagonLayerService)
      const routerService = Container.get(RouterService)
      id === buttons[0].id ? hexagonLayerService.resetHexagonLayerPropsState() : void routerService.setRoute(id)
    }
    return (): JSX.Element => (
      <>
        {buttons.map(({ id, text }) => (
          <button id={id} onClick={(evt): void => onClickHandler(evt)}>
            {text}
          </button>
        ))}
      </>
    )
  }
})
