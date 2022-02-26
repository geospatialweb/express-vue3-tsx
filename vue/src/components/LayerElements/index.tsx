import { Container } from 'typedi'
import { ComputedRef, computed, defineComponent } from 'vue'

import { LayerElement, LayerIcon } from '@/components'
import { layerIcons as icons } from '@/configuration'
import { ILayerElement } from '@/interfaces'
import { LayerElementService } from '@/services'
import { layerElement } from './index.module.css'

export default defineComponent({
  setup() {
    const getLayerElementsState = (): ComputedRef<Array<ILayerElement>> => {
      const { state } = Container.get(LayerElementService)
      return computed((): Array<ILayerElement> => state)
    }
    const listItem = ({ id, isActive, name }: ILayerElement, i: number): JSX.Element => (
      <li>
        <LayerIcon
          height={icons[i].height}
          id={`${id}-icon`}
          key={id}
          name={name}
          src={icons[i].src}
          width={icons[i].width}
        />
        <LayerElement id={id} isActive={isActive} key={id} name={name} />
      </li>
    )
    const jsx = (layerElements: Array<ILayerElement>): JSX.Element => (
      <ul id="layer-element" class={layerElement}>
        {layerElements.map(listItem)}
      </ul>
    )
    return (): JSX.Element => jsx(getLayerElementsState().value)
  }
})
