import { FeatureCollection } from 'geojson'
import cloneDeep from 'lodash.clonedeep'
import { Service } from 'typedi'

import { ILayer } from '@/interfaces'

@Service()
export default class GeoJsonLayerService {
  private _layers: Array<ILayer> = []

  get layers(): Array<ILayer> {
    return this._layers
  }

  setLayer(layer: ILayer, fc: FeatureCollection): void {
    this._layers = [...this._layers, this.setLayerSourceData(layer, fc)]
  }

  private setLayerSourceData(layer: ILayer, fc: FeatureCollection): ILayer {
    layer.source.data = fc
    return cloneDeep(layer)
  }
}
