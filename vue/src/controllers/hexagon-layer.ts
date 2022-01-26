import { Container, Service } from 'typedi'

import { IEventTarget } from '@/interfaces'
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
      el.addEventListener('change', (evt): void => this.onSetHexagonLayerPropsChangeHandler(evt))
      el.addEventListener('mouseover', (evt): void => this.onInputElementMouseEventHandler(evt))
      el.addEventListener('mouseout', (evt): void => this.onInputElementMouseEventHandler(evt))
    }
    for (const el of document.querySelectorAll('button#reset')) {
      el.addEventListener('click', (evt): void => this.onResetHexagonLayerPropsClickHandler(evt))
    }
    for (const el of document.querySelectorAll('button#mapbox')) {
      el.addEventListener('click', (evt): void => this.onReturnToTrailsClickHandler(evt))
    }
  }

  removeHexagonLayerEventListeners(): void {
    for (const el of document.querySelectorAll('input.hexagonUI')) {
      el.removeEventListener('change', (evt): void => this.onSetHexagonLayerPropsChangeHandler(evt))
      el.removeEventListener('mouseover', (evt): void => this.onInputElementMouseEventHandler(evt))
      el.removeEventListener('mouseout', (evt): void => this.onInputElementMouseEventHandler(evt))
    }
    for (const el of document.querySelectorAll('button#reset')) {
      el.removeEventListener('click', (evt): void => this.onResetHexagonLayerPropsClickHandler(evt))
    }
    for (const el of document.querySelectorAll('button#mapbox')) {
      el.removeEventListener('click', (evt): void => this.onReturnToTrailsClickHandler(evt))
    }
  }

  private onInputElementMouseEventHandler(evt: Event): void {
    evt.stopPropagation()
    /* prettier-ignore */
    const { target: { id } }: IEventTarget = <any>evt
    id && this._hexagonUIService.setHexagonUILabelElementState(id)
  }

  private onSetHexagonLayerPropsChangeHandler(evt: Event): void {
    evt.stopPropagation()
    /* prettier-ignore */
    const { target: { id, value } }: IEventTarget = <any>evt
    id && value && this._hexagonLayerService.setHexagonLayerPropsState(id, Number(value))
  }

  private onResetHexagonLayerPropsClickHandler(evt: Event): void {
    evt.stopPropagation()
    this._hexagonLayerService.resetHexagonLayerPropsState()
  }

  private onReturnToTrailsClickHandler(evt: Event): void {
    evt.stopPropagation()
    /* prettier-ignore */
    const { target: { id } }: IEventTarget = <any>evt
    id && this._routerService.setRoute(id)
  }
}
