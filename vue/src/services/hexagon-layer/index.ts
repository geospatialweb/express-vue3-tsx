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
import { ReactiveState } from '@/enums'
import { IHexagonLayerProp, IHexagonLayerStaticProp, IReactiveState } from '@/interfaces'
import { DataService, DeckglService, ModalService, StoreService } from '@/services'

@Service()
export default class HexagonLayerService {
  private _hexagonLayerData: number[][]
  private _reactiveProps: IHexagonLayerProp
  private _reactiveStates: IReactiveState
  private _skyLayer: SkyLayer
  private _staticProps: IHexagonLayerStaticProp
  private _dataService: DataService
  private _deckglService: DeckglService
  private _modalService: ModalService
  private _storeService: StoreService

  constructor(private _map: Map) {
    this._hexagonLayerData = []
    this._reactiveProps = hexagonLayer.reactiveProps
    this._reactiveStates = ReactiveState
    this._skyLayer = <SkyLayer>deckgl.skyLayer
    this._staticProps = hexagonLayer.staticProps
    this._dataService = Container.get(DataService)
    this._deckglService = Container.get(DeckglService)
    this._modalService = Container.get(ModalService)
    this._storeService = Container.get(StoreService)
  }

  get state(): IHexagonLayerProp {
    const { HEXAGON_LAYER_PROPS } = this._reactiveStates
    return <IHexagonLayerProp>this._storeService.getReactiveState(HEXAGON_LAYER_PROPS)
  }

  private set _state(props: IHexagonLayerProp) {
    const { HEXAGON_LAYER_PROPS } = this._reactiveStates
    this._storeService.setReactiveState(HEXAGON_LAYER_PROPS, props)
  }

  loadHexagonLayer(): void {
    this._deckglService.loadDeckgl()
    this._deckglService.loadMapbox()
    this._setMapInstance()
  }

  resetHexagonLayerPropsState(): void {
    this._state = this._reactiveProps
    this._renderHexagonLayer()
  }

  setHexagonLayerPropsState(id: string, value: number): void {
    const state = this.state
    state[id as keyof IHexagonLayerProp] = value
    this._state = state
    this._renderHexagonLayer()
  }

  private _setMapInstance(): void {
    const { map } = this._deckglService
    this._map = map.on('load', (): void => this._onMapLoadHandler())
  }

  private _onMapLoadHandler(): void {
    this._addSkyLayer()
    this._renderHexagonLayer()
    this._hideModal()
  }

  private _addSkyLayer(): void {
    this._map.addLayer(this._skyLayer)
  }

  private _hideModal(): void {
    setTimeout((): void => this._modalService.hideModal(), 400)
  }

  private _renderHexagonLayer(): void {
    !this._hexagonLayerData.length && this._setHexagonLayerData()
    const { deck } = this._deckglService
    const hexagonLayer: HexagonLayer = new HexagonLayer({
      data: this._hexagonLayerData,
      getPosition: (d: number[]): number[] => d,
      ...this._staticProps,
      ...this.state
    })
    deck.setProps({ layers: [hexagonLayer] })
  }

  private _setHexagonLayerData(): void {
    const { hexagonLayerData } = this._dataService
    this._hexagonLayerData = hexagonLayerData
  }
}
