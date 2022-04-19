/*
 * Example URL: https://deck.gl/gallery/hexagon-layer
 * Data URL: https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv
 * Data Source: https://data.gov.uk
 */
/* eslint-disable */
/* @ts-ignore */
import { HexagonLayer } from '@deck.gl/aggregation-layers'
import { Map, SkyLayer } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { deckgl, hexagonLayer } from '@/configuration'
import { ReactiveStates } from '@/enums'
import { IHexagonLayerProps, IHexagonLayerStaticProps } from '@/interfaces'
import { DataService, DeckglService, ModalService, StoreService } from '@/services'

@Service()
export default class HexagonLayerService {
  private _hexagonLayerData: Array<Array<number>> = []
  private _reactiveProps: IHexagonLayerProps = hexagonLayer.reactiveProps
  private _reactiveStates: Record<string, string> = ReactiveStates
  private _skyLayer = <SkyLayer>deckgl.skyLayer
  private _staticProps: IHexagonLayerStaticProps = hexagonLayer.staticProps

  constructor(
    private _map: Map,
    private _dataService: DataService,
    private _deckglService: DeckglService,
    private _modalService: ModalService,
    private _storeService: StoreService
  ) {
    this._dataService = Container.get(DataService)
    this._deckglService = Container.get(DeckglService)
    this._modalService = Container.get(ModalService)
    this._storeService = Container.get(StoreService)
  }

  get state(): IHexagonLayerProps {
    const { HEXAGON_LAYER_PROPS } = this._reactiveStates
    return <IHexagonLayerProps>this._storeService.getReactiveState(HEXAGON_LAYER_PROPS)
  }

  private set _state(props: IHexagonLayerProps) {
    const { HEXAGON_LAYER_PROPS } = this._reactiveStates
    this._storeService.setReactiveState(HEXAGON_LAYER_PROPS, props)
  }

  loadHexagonLayer(): void {
    this._deckglService.loadDeckgl()
    this._deckglService.loadMapbox()
    this.setMapInstance()
  }

  setHexagonLayerPropsState(id: string, value: number): void {
    const state = this.state
    state[id as keyof IHexagonLayerProps] = value
    this._state = state
    this.renderHexagonLayer()
  }

  resetHexagonLayerPropsState(): void {
    this._state = this._reactiveProps
    this.renderHexagonLayer()
  }

  private setMapInstance(): void {
    const { map } = this._deckglService
    this._map = map.on('load', (): void => this.onMapLoadHandler())
  }

  private onMapLoadHandler(): void {
    this.addSkyLayer()
    this.renderHexagonLayer()
    this.hideModal()
  }

  private addSkyLayer(): void {
    this._map.addLayer(this._skyLayer)
  }

  private renderHexagonLayer(): void {
    !this._hexagonLayerData.length && this.setHexagonLayerData()
    const { deck } = this._deckglService
    const hexagonLayer = new HexagonLayer({
      data: this._hexagonLayerData,
      getPosition: (d: Array<number>): Array<number> => d,
      ...this._staticProps,
      ...this.state
    })
    deck.setProps({ layers: [hexagonLayer] })
  }

  private setHexagonLayerData(): void {
    const { hexagonLayerData } = this._dataService
    this._hexagonLayerData = hexagonLayerData
  }

  private hideModal(): void {
    setTimeout((): void => this._modalService.hideModal(), 400)
  }
}
