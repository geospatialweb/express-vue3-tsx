import { FeatureCollection } from 'geojson'
import { LngLatLike } from 'mapbox-gl'

export interface IApp {
  initialZoom: Record<string, number> | undefined
  isMobile: boolean
}

export interface IDeckglOption extends IDeckglProp {
  controller: boolean
  id: string
  interactive: boolean
  maxPitch: number
  maxZoom: number
  minZoom: number
  style: string
}

export interface IDeckglProp extends IMapboxProp {
  canvas: string
}

export interface IDeckglViewSetting {
  bearing: number
  center: LngLatLike
  latitude: number
  longitude: number
  pitch: number
  zoom: number
}

export interface IEndpoint {
  GEOJSON_ENDPOINT: string
  MAPBOX_ACCESS_TOKEN_ENDPOINT: string
}

export interface IHexagonLayerProp {
  coverage: number
  elevationScale: number
  radius: number
  upperPercentile: number
}

export interface IHexagonLayerStaticProp {
  colorRange: number[][]
  elevationRange: number[]
  extruded: boolean
  id: string
  material: {
    ambient: number
    diffuse: number
    shininess: number
    specularColor: number[]
  }
  pickable: boolean
  transitions: {
    coverage: number
    elevationScale: number
  }
}

export interface IHexagonUILabelElement {
  coverage: boolean
  elevationScale: boolean
  radius: boolean
  upperPercentile: boolean
}

export interface IHexagonUIProp {
  label: IHexagonUILabelElement
  props: IHexagonLayerProp
}

export interface IHttpParam {
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
  className?: string
  id: string
  isActive: boolean
  name: string
}

export interface ILayerElements {
  BIOSPHERE: string
  BIOSPHERE_BORDER: string
  DECKGL: string
  OFFICE: string
  PLACES: string
  SATELLITE: string
  TRAILS: string
}

export interface ILayerIcon {
  height: string
  id: string
  name: string
  src: string
  width: string
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

export interface ILngLat {
  lat: number
  lng: number
}

export interface ILogState {
  REACTIVE: string
  STATIC: string
}

export interface ILogStatus {
  NEW: string
  OLD: string
}

export interface IMapStyle {
  isActive: boolean
  url: string
}

export interface IMapboxOption extends IMapboxProp {
  doubleClickZoom: boolean
  maxZoom: number
  minZoom: number
}

export interface IMapboxProp {
  container: string
}

export interface IMapboxSetting {
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

export interface IQueryParam {
  fields: string
  id: string
}

export interface IReactiveState {
  HEXAGON_LAYER_PROPS: string
  HEXAGON_UI_LABEL_ELEMENT: string
  LAYER_ELEMENTS: string
  MODAL: string
}

export interface IStaticState {
  APP: string
  DECKGL_VIEW_SETTINGS: string
  LAYER_VISIBILITY: string
  MAP_STYLES: string
  MAPBOX_SETTINGS: string
  MARKER_VISIBILITY: string
}

export interface ITrail {
  center: LngLatLike
  name: string
  zoom: number
}

export interface IUrl {
  API_BASE_URL_DEV: string
  API_BASE_URL_PROD: string
  HEXAGON_LAYER_DATA_URL: string
}
