import { Container } from 'typedi'
import { ComputedRef, computed, defineComponent } from 'vue'

import { LayerElement, LayerIcon } from '@/components'
import { layerIcons } from '@/configuration'
import { ILayerElement } from '@/interfaces'
import { LayerElementService } from '@/services'
import styles from './index.module.css'

export default defineComponent({
  setup() {
    const { layerElement } = styles
    const getLayerElementsState = (): ComputedRef<ILayerElement[]> => {
      const { state } = Container.get(LayerElementService)
      return computed((): ILayerElement[] => state)
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
          src={layerIcons[i].src}
          height={layerIcons[i].height}
          width={layerIcons[i].width}
        />
        <LayerElement id={id} key={id} name={name} isActive={isActive} />
      </li>
    )
    const jsx = (layerElements: ILayerElement[]): JSX.Element => (
      <ul class={layerElement} title="layers" onClick={(evt): void => onClickHandler(evt)}>
        {layerElements.map(listItem)}
      </ul>
    )
    return (): JSX.Element => jsx(getLayerElementsState().value)
  }
})
