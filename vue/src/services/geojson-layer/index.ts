import { FeatureCollection } from 'geojson'
import cloneDeep from 'lodash.clonedeep'
import { Service } from 'typedi'

import { ILayer } from '@/interfaces'

@Service()
export default class GeoJSONLayerService {
  private _layers: ILayer[]

  constructor() {
    this._layers = []
  }

  get layers(): ILayer[] {
    return this._layers
  }

  setLayer(layer: ILayer, fc: FeatureCollection): void {
    this._layers = [...this._layers, this._setLayerSourceData(layer, fc)]
  }

  private _setLayerSourceData(layer: ILayer, fc: FeatureCollection): ILayer {
    layer.source.data = fc
    return cloneDeep(layer)
  }
}
