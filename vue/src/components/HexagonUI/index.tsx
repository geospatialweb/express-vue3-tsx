import { Container } from 'typedi'
import { ComputedRef, computed, defineComponent } from 'vue'

import {
  hexagonUIButtons as buttons,
  hexagonUIFooter as footer,
  hexagonUIHeader as header,
  hexagonUISliders as sliders
} from '@/configuration'
import { IHexagonLayerProps, IHexagonUIButton, IHexagonUILabelElement } from '@/interfaces'
import { HexagonLayerService, HexagonUIService } from '@/services'
import { hexagonUI, mouseover, mouseout } from './index.module.css'

export default defineComponent({
  setup() {
    const getHexagonLayerState = (): ComputedRef<IHexagonLayerProps> => {
      const { state } = Container.get(HexagonLayerService)
      return computed((): IHexagonLayerProps => state)
    }
    const getHexagonUIState = (): ComputedRef<IHexagonUILabelElement> => {
      const { state } = Container.get(HexagonUIService)
      return computed((): IHexagonUILabelElement => state)
    }
    const jsx = (props: IHexagonLayerProps, label: IHexagonUILabelElement): JSX.Element => (
      <div class={hexagonUI}>
        <header aria-label={header.text}>{header.text}</header>
        <hr />
        {Object.values(props).map((value: string, i: number) => (
          <section aria-label={`${sliders[i].label} Section`}>
            <label class={label[sliders[i].id as keyof IHexagonUILabelElement] ? mouseover : mouseout}>
              {sliders[i].label}
              <input
                id={sliders[i].id}
                class="hexagonUI"
                type="range"
                min={sliders[i].min}
                max={sliders[i].max}
                step={sliders[i].step}
                value={value}
              />
            </label>
            <span>{value}</span>
            <hr />
          </section>
        ))}
        <footer aria-label={footer.label}>
          {buttons.map(({ id, text }: IHexagonUIButton) => (
            <button id={id} aria-label={`${text} Button`}>
              {text}
            </button>
          ))}
        </footer>
      </div>
    )
    return (): JSX.Element => jsx(getHexagonLayerState().value, getHexagonUIState().value)
  }
})
