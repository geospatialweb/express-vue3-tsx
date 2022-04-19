import { Container } from 'typedi'
import { ComputedRef, computed, defineComponent } from 'vue'

import { LayerElement, LayerIcon } from '@/components'
import { layerIcons as icons } from '@/configuration'
import { ILayerElement } from '@/interfaces'
import { LayerElementService } from '@/services'
import styles from './index.module.css'

export default defineComponent({
  setup() {
    const { layerElement } = styles
    const getLayerElementsState = (): ComputedRef<Array<ILayerElement>> => {
      const { state } = Container.get(LayerElementService)
      return computed((): Array<ILayerElement> => state)
    }
    const onClickHandler = (evt: MouseEvent): void => {
      evt.stopPropagation()
      const { id } = evt.target as HTMLDivElement
      const layerElementService = Container.get(LayerElementService)
      layerElementService.displayLayerElement(id.split('-icon')[0])
    }
    const listItem = ({ id, isActive, name }: ILayerElement, i: number): JSX.Element => (
      <li>
        <LayerIcon
          id={`${id}-icon`}
          key={id}
          name={name}
          src={icons[i].src}
          height={icons[i].height}
          width={icons[i].width}
        />
        <LayerElement id={id} key={id} name={name} isActive={isActive} />
      </li>
    )
    const jsx = (layerElements: Array<ILayerElement>): JSX.Element => (
      <ul class={layerElement} title="layers" onClick={(evt): void => onClickHandler(evt)}>
        {layerElements.map(listItem)}
      </ul>
    )
    return (): JSX.Element => jsx(getLayerElementsState().value)
  }
})
