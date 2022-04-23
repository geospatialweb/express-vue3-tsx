import cloneDeep from 'lodash.clonedeep'
import { Container, Service } from 'typedi'

import { trails } from '@/configuration'
import { ITrail } from '@/interfaces'
import { MapboxService } from '@/services'

@Service()
export default class TrailService {
  private _trails: ITrail[]
  private _mapboxService: MapboxService

  constructor() {
    this._trails = cloneDeep(trails)
    this._mapboxService = Container.get(MapboxService)
  }

  selectTrail(name: string): void {
    const isSelected = (trail: ITrail): boolean => trail.name === name
    const trail = this._trails.find(isSelected)
    trail && this._mapboxService.mapFlyTo(trail)
  }

  setInitialZoom(factor: number): void {
    for (const trail of this._trails) {
      trail.zoom && (trail.zoom = Number((trail.zoom * factor).toFixed(1)))
    }
  }
}
