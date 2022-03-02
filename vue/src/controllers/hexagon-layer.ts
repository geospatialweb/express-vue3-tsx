import { Container, Service } from 'typedi'

import { HexagonLayerService, HexagonUIService, RouterService } from '@/services'

@Service()
export default class HexagonLayerController {
  constructor(
    private _hexagonLayerService: HexagonLayerService,
    private _hexagonUIService: HexagonUIService,
    private _routerService: RouterService
  ) {
    this._hexagonLayerService = Container.get(HexagonLayerService)
    this._hexagonUIService = Container.get(HexagonUIService)
    this._routerService = Container.get(RouterService)
  }

  addHexagonLayerEventListeners(): void {
    for (const el of document.querySelectorAll('input.hexagonUI')) {
      el.addEventListener('change', (evt): void => this.onHexagonLayerPropsChangeHandler(evt))
      el.addEventListener('mouseover', (evt): void => this.onInputElementMouseEventHandler(evt))
      el.addEventListener('mouseout', (evt): void => this.onInputElementMouseEventHandler(evt))
    }
    for (const el of document.querySelectorAll('button#reset')) {
      el.addEventListener('click', (evt): void => this.onResetParamatersButtonClickHandler(evt))
    }
    for (const el of document.querySelectorAll('button#mapbox')) {
      el.addEventListener('click', (evt): void => this.onReturnToTrailsButtonClickHandler(evt))
    }
  }

  removeHexagonLayerEventListeners(): void {
    for (const el of document.querySelectorAll('input.hexagonUI')) {
      el.removeEventListener('change', (evt): void => this.onHexagonLayerPropsChangeHandler(evt))
      el.removeEventListener('mouseover', (evt): void => this.onInputElementMouseEventHandler(evt))
      el.removeEventListener('mouseout', (evt): void => this.onInputElementMouseEventHandler(evt))
    }
    for (const el of document.querySelectorAll('button#reset')) {
      el.removeEventListener('click', (evt): void => this.onResetParamatersButtonClickHandler(evt))
    }
    for (const el of document.querySelectorAll('button#mapbox')) {
      el.removeEventListener('click', (evt): void => this.onReturnToTrailsButtonClickHandler(evt))
    }
  }

  private onInputElementMouseEventHandler(evt: Event): void {
    evt.stopPropagation()
    const { id } = <HTMLInputElement>evt.target
    id && this._hexagonUIService.setHexagonUILabelElementState(id)
  }

  private onHexagonLayerPropsChangeHandler(evt: Event): void {
    evt.stopPropagation()
    const { id, value } = <HTMLInputElement>evt.target
    id && value && this._hexagonLayerService.setHexagonLayerPropsState(id, Number(value))
  }

  private onResetParamatersButtonClickHandler(evt: Event): void {
    evt.stopPropagation()
    this._hexagonLayerService.resetHexagonLayerPropsState()
  }

  private onReturnToTrailsButtonClickHandler(evt: Event): void {
    evt.stopPropagation()
    const { id } = <HTMLButtonElement>evt.target
    id && this._routerService.setRoute(id)
  }
}
