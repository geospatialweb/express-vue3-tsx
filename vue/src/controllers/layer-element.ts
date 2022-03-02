import { Container, Service } from 'typedi'

import { LayerElementService } from '@/services'

@Service()
export default class LayerElementController {
  constructor(private _layerElementService: LayerElementService) {
    this._layerElementService = Container.get(LayerElementService)
  }

  addLayerElementEventListener(): void {
    const el = document.getElementById('layer-element')
    el && el.addEventListener('click', (evt): void => this.onLayerElementClickHandler(evt))
  }

  removeLayerElementEventListener(): void {
    const el = document.getElementById('layer-element')
    el && el.removeEventListener('click', (evt): void => this.onLayerElementClickHandler(evt))
  }

  private onLayerElementClickHandler(evt: Event): void {
    evt.stopPropagation()
    const { id } = <HTMLDivElement>evt.target
    id && this._layerElementService.displayLayerElement(id)
  }
}
