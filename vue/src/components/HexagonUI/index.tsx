import { Container } from 'typedi'
import { ComputedRef, computed, defineComponent } from 'vue'

import { HexagonUIButtons, HexagonUIHeading, HexagonUISliders } from '@/components'
import { hexagonUIHeading } from '@/configuration'
import { IHexagonLayerProps, IHexagonUILabelElement } from '@/interfaces'
import { HexagonLayerService, HexagonUIService } from '@/services'
import styles from './index.module.css'

export default defineComponent({
  setup() {
    const { hexagonUI } = styles
    const { text } = hexagonUIHeading
    const getHexagonLayerState = (): ComputedRef<IHexagonLayerProps> => {
      const { state } = Container.get(HexagonLayerService)
      return computed((): IHexagonLayerProps => state)
    }
    const getHexagonUIState = (): ComputedRef<IHexagonUILabelElement> => {
      const { state } = Container.get(HexagonUIService)
      return computed((): IHexagonUILabelElement => state)
    }
    const jsx = (props: IHexagonLayerProps, label: IHexagonUILabelElement): JSX.Element => (
      <div class={hexagonUI} role="presentation">
        <HexagonUIHeading text={text} />
        <HexagonUISliders label={label} props={props} />
        <HexagonUIButtons />
      </div>
    )
    return (): JSX.Element => jsx(getHexagonLayerState().value, getHexagonUIState().value)
  }
})
