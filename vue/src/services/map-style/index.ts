import { Container, Service } from 'typedi'

import { StaticState } from '@/enums'
import { IMapStyle, IStaticState } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class MapStyleService {
  private _mapStyle: string
  private _staticStates: IStaticState
  private _storeService: StoreService

  constructor() {
    this._mapStyle = ''
    this._staticStates = StaticState
    this._storeService = Container.get(StoreService)
    this.setMapStyle()
  }

  get mapStyle(): string {
    return this._mapStyle
  }

  private get _state(): IMapStyle[] {
    const { MAP_STYLES } = this._staticStates
    return <IMapStyle[]>this._storeService.getStaticState(MAP_STYLES)
  }

  private set _state(mapStyles: IMapStyle[]) {
    const { MAP_STYLES } = this._staticStates
    this._storeService.setStaticState(MAP_STYLES, mapStyles)
  }

  setMapStyle(): void {
    const mapStyles = this._state
    const isActive = ({ isActive }: IMapStyle): boolean => isActive
    const mapStyle = mapStyles.find(isActive)
    mapStyle && (this._mapStyle = mapStyle.url)
  }

  setMapStyleState(): void {
    const state = this._state
    const isActive = (mapStyle: IMapStyle): boolean => (mapStyle.isActive = !mapStyle.isActive)
    state.forEach(isActive)
    this._state = state
  }
}
