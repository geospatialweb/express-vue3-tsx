import cloneDeep from 'lodash.clonedeep'
import { Container, Service } from 'typedi'

import { trails } from '@/configuration'
import { ITrail } from '@/interfaces'
import { MapService } from '@/services'

@Service()
export default class TrailService {
  private _trails: Array<ITrail> = cloneDeep(trails)

  constructor(private _mapService: MapService) {
    this._mapService = Container.get(MapService)
  }

  selectTrail(name: string): void {
    const isSelected = (trail: ITrail): boolean => trail.name === name
    const trail = this._trails.find(isSelected)
    trail && this._mapService.mapFlyTo(trail)
  }

  setInitialZoom(factor: number): void {
    for (const trail of this._trails) {
      trail.zoom && (trail.zoom = Number((trail.zoom * factor).toFixed(1)))
    }
  }
}
