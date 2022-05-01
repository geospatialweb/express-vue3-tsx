import { Container } from 'typedi'
import { defineComponent, PropType } from 'vue'

import { hexagonUISliders as sliders } from '@/configuration'
import { IHexagonLayerProp, IHexagonUILabelElement, IHexagonUIProp } from '@/interfaces'
import { HexagonLayerService, HexagonUIService } from '@/services'
import styles from '../index.module.css'

export default defineComponent({
  props: {
    label: {
      type: Object as PropType<IHexagonUILabelElement>,
      required: true
    },
    props: {
      type: Object as PropType<IHexagonLayerProp>,
      required: true
    }
  },
  setup(props: IHexagonUIProp) {
    const { mouseover, mouseout } = styles
    const onInputController = (evt: Event): void => {
      evt.stopPropagation()
      const { id, value } = evt.target as HTMLInputElement
      const hexagonLayerService = Container.get(HexagonLayerService)
      hexagonLayerService.setHexagonLayerPropsState(id, Number(value))
    }
    const onMouseover_onMouseoutController = (evt: MouseEvent): void => {
      evt.stopPropagation()
      const { id } = evt.target as HTMLInputElement
      const hexagonUIService = Container.get(HexagonUIService)
      hexagonUIService.setHexagonUILabelElementState(id)
    }
    const jsx = ({ props, label }: IHexagonUIProp): JSX.Element => (
      <>
        <hr />
        {Object.values(props).map((value: string, i: number) => (
          <section>
            <label
              class={label[sliders[i].id as keyof IHexagonUILabelElement] ? mouseover : mouseout}
              data-testid={sliders[i].id}
            >
              {sliders[i].text}
              <input
                id={sliders[i].id}
                min={sliders[i].min}
                max={sliders[i].max}
                step={sliders[i].step}
                type="range"
                value={value}
                aria-valuemin={sliders[i].min}
                aria-valuemax={sliders[i].max}
                aria-valuenow={value}
                onInput={(evt): void => onInputController(evt)}
                onMouseover={(evt): void => onMouseover_onMouseoutController(evt)}
                onMouseout={(evt): void => onMouseover_onMouseoutController(evt)}
              />
            </label>
            <output for={sliders[i].id}>{value}</output>
            <hr />
          </section>
        ))}
      </>
    )
    return (): JSX.Element => jsx(props)
  }
})
