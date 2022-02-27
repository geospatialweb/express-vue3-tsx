export enum Endpoints {
  GEOJSON_ENDPOINT = '/geojson',
  MAPBOX_ACCESS_TOKEN_ENDPOINT = '/mapbox-access-token'
}

export enum LayerElements {
  BIOSPHERE = 'biosphere',
  BIOSPHERE_BORDER = 'biosphere-border',
  DECKGL = 'deckgl',
  OFFICE = 'office',
  PLACES = 'places',
  SATELLITE = 'satellite',
  TRAILS = 'trails'
}

export enum LogStates {
  REACTIVE = 'reactive',
  STATIC = 'static'
}

export enum LogStatus {
  NEW = 'NEW',
  OLD = 'OLD'
}

export enum ReactiveStates {
  HEXAGON_LAYER_PROPS = 'hexagonLayerProps',
  HEXAGON_UI_LABEL_ELEMENT = 'hexagonUILabelElement',
  LAYER_ELEMENTS = 'layerElements',
  MODAL = 'modal'
}

export enum StaticStates {
  APP = 'app',
  DECKGL_VIEW_SETTINGS = 'deckglViewSettings',
  LAYER_VISIBILITY = 'layerVisibilty',
  MAP_STYLES = 'mapStyles',
  MAPBOX_SETTINGS = 'mapboxSettings',
  MARKER_VISIBILITY = 'markerVisibilty'
}

export enum Urls {
  API_BASE_URL_DEV = 'http://localhost:8000/api/',
  API_BASE_URL_PROD = 'https://geospatialweb.ca:8000/api/',
  HEXAGON_LAYER_DATA_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'
}
