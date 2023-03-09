import { DSVRowArray } from 'd3-dsv'
import { FeatureCollection } from 'geojson'

import {
  IApp,
  IDeckglViewSetting,
  IHexagonLayerProp,
  IHexagonUILabelElement,
  ILayerElement,
  ILayerVisibility,
  IMapStyle,
  IMapboxSetting,
  IMarkerVisibility,
  IModal
} from '@/interfaces'

export type HttpCsvResponse = DSVRowArray<string> | void
export type HttpGetResponse = FeatureCollection | string | void
export type LayerElement = 'biosphere' | 'biosphere-border' | 'deckgl' | 'office' | 'places' | 'satellite' | 'trails'
export type LogData = ReactiveState | StaticState | string
export type NavigationControlPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type ReactiveState = IHexagonLayerProp | IHexagonUILabelElement | ILayerElement[] | IModal
export type StaticState =
  | IApp
  | IDeckglViewSetting
  | ILayerVisibility
  | IMapboxSetting
  | IMapStyle[]
  | IMarkerVisibility
