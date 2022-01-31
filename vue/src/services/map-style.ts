import { Container, Service } from 'typedi'

import { StaticStates } from '@/enums'
import { IMapStyle } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class MapStyleService {
  private _mapStyle: string = ''
  private _staticStates: Record<string, string> = StaticStates

  constructor(private _storeService: StoreService) {
    this._storeService = Container.get(StoreService)
    this.setMapStyle()
  }

  get mapStyle(): string {
    return this._mapStyle
  }

  private get _state(): Array<IMapStyle> {
    const { MAP_STYLES } = this._staticStates
    return <Array<IMapStyle>>this._storeService.getStaticState(MAP_STYLES)
  }

  private set _state(mapStyles: Array<IMapStyle>) {
    const { MAP_STYLES } = this._staticStates
    this._storeService.setStaticState(MAP_STYLES, mapStyles)
  }

  setMapStyle(): void {
    const mapStyles = this._state
    const isActive = (mapStyle: IMapStyle): boolean => mapStyle.isActive
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
