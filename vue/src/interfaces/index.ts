import { FeatureCollection } from 'geojson'
import { LngLatLike } from 'mapbox-gl'

export interface IApp {
  initialZoom: Record<string, number> | undefined
  isMobile: boolean
}

export interface IDeckglOptions extends IDeckglProps {
  controller: boolean
  id: string
  interactive: boolean
  maxPitch: number
  maxZoom: number
  minZoom: number
  style: string
}

export interface IDeckglProps extends IMapboxProps {
  canvas: string
}

export interface IDeckglViewSettings {
  bearing: number
  center: LngLatLike
  latitude: number
  longitude: number
  pitch: number
  zoom: number
}

export interface IHexagonLayerProps {
  coverage: number
  elevationScale: number
  radius: number
  upperPercentile: number
}

export interface IHexagonLayerStaticProps {
  colorRange: Array<Array<number>>
  elevationRange: Array<number>
  extruded: boolean
  id: string
  material: {
    ambient: number
    diffuse: number
    shininess: number
    specularColor: Array<number>
  }
  pickable: boolean
  transitions: {
    coverage: number
    elevationScale: number
  }
}

export interface IHexagonUIButton {
  id: string
  text: string
}

export interface IHexagonUILabelElement {
  coverage: boolean
  elevationScale: boolean
  radius: boolean
  upperPercentile: boolean
}

export interface IHttpParams {
  fields: string
  table: string
}

export interface ILayer {
  id: string
  type: string
  source: {
    type: string
    data: Record<string, never> | FeatureCollection
  }
  layout: {
    visibility: string
  }
  paint: {
    'fill-color'?: string
    'fill-opacity'?: number
    'fill-outline-color'?: string
    'line-color'?: string
    'line-width'?: number
  }
}

export interface ILayerElement {
  id: string
  isActive: boolean
  name: string
}

export interface ILayerIcon {
  height: number
  id: string
  name: string
  src: string
  width: number
}

export interface ILayerVisibility {
  biosphere: {
    isActive: boolean
  }
  'biosphere-border': {
    isActive: boolean
  }
  trails: {
    isActive: boolean
  }
}

export interface IMapStyle {
  isActive: boolean
  url: string
}

export interface IMapboxOptions extends IMapboxProps {
  doubleClickZoom: boolean
  maxZoom: number
  minZoom: number
}

export interface IMapboxProps {
  container: string
}

export interface IMapboxSettings {
  bearing: number
  center: LngLatLike
  pitch: number
  style: string
  zoom: number
}

export interface IMarkerVisibility {
  office: {
    isActive: boolean
    isHidden: boolean
  }
  places: {
    isActive: boolean
    isHidden: boolean
  }
  trails: {
    isActive: boolean
    isHidden: boolean
  }
}

export interface IModal {
  isActive: boolean
}

export interface IQueryParams {
  fields: string
  id: string
}

export interface ITrail {
  center: LngLatLike | undefined
  name: string
  zoom: number | undefined
}
