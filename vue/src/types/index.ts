import { DSVRowArray } from 'd3-dsv'
import { FeatureCollection } from 'geojson'

import {
  IApp,
  IDeckglViewSettings,
  IHexagonLayerProps,
  IHexagonUILabelElement,
  ILayerElement,
  ILayerVisibility,
  IMapStyle,
  IMapboxSettings,
  IMarkerVisibility,
  IModal
} from '@/interfaces'

export type HttpCsvResponse = DSVRowArray<string> | void
export type HttpGetResponse = FeatureCollection | string | void
export type LayerElement = 'biosphere' | 'deckgl' | 'office' | 'places' | 'satellite' | 'trails'
export type LayerIcon =
  | 'biosphere-icon'
  | 'deckgl-icon'
  | 'office-icon'
  | 'places-icon'
  | 'satellite-icon'
  | 'trails-icon'
export type LogData = ReactiveState | StaticState | string
export type NavigationControlPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type ReactiveState = Array<ILayerElement> | IHexagonLayerProps | IHexagonUILabelElement | IModal
export type StaticState =
  | Array<IMapStyle>
  | IApp
  | IDeckglViewSettings
  | ILayerVisibility
  | IMapboxSettings
  | IMarkerVisibility
