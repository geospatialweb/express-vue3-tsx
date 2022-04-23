import { Container } from 'typedi'
import { ComputedRef, computed, defineComponent } from 'vue'

import { HexagonUIButtons, HexagonUIHeading, HexagonUISliders } from '@/components'
import { hexagonUIHeading } from '@/configuration'
import { IHexagonLayerProp, IHexagonUILabelElement } from '@/interfaces'
import { HexagonLayerService, HexagonUIService } from '@/services'
import styles from './index.module.css'

export default defineComponent({
  setup() {
    const { hexagonUI } = styles
    const { text } = hexagonUIHeading
    const getHexagonLayerState = (): ComputedRef<IHexagonLayerProp> => {
      const { state } = Container.get(HexagonLayerService)
      return computed((): IHexagonLayerProp => state)
    }
    const getHexagonUIState = (): ComputedRef<IHexagonUILabelElement> => {
      const { state } = Container.get(HexagonUIService)
      return computed((): IHexagonUILabelElement => state)
    }
    const jsx = (props: IHexagonLayerProp, label: IHexagonUILabelElement): JSX.Element => (
      <div class={hexagonUI} role="presentation">
        <HexagonUIHeading text={text} />
        <HexagonUISliders label={label} props={props} />
        <HexagonUIButtons />
      </div>
    )
    return (): JSX.Element => jsx(getHexagonLayerState().value, getHexagonUIState().value)
  }
})
