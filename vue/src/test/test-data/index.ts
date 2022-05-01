export default {
  initialZoomFactor: 0.9,
  layer: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-76.205278, 44.297778],
              [-75.903611, 44.380833],
              [-75.825278, 44.430833],
              [-75.809444, 44.478611],
              [-75.653333, 44.599167],
              [-75.676389, 44.614722],
              [-75.851389, 44.648056],
              [-76.086944, 44.633611],
              [-76.203889, 44.660278],
              [-76.331667, 44.668611],
              [-76.545278, 44.773056],
              [-76.674444, 44.716944],
              [-76.706389, 44.504444],
              [-76.880278, 44.492222],
              [-76.760556, 44.326389],
              [-76.425556, 44.347778],
              [-76.213611, 44.483333],
              [-76.205278, 44.297778]
            ]
          ]
        },
        properties: {
          name: 'Frontenac Arch Biosphere',
          description:
            'The Frontenac Arch is the ancient granite bridge from the Canadian Shield to the Adirondack Mountains Its incredibly rich natural environment and history was recognized in 2002 when it became a UNESCO World Biosphere Reserve.'
        }
      }
    ]
  },
  marker: {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-76.011422, 44.384362]
    },
    properties: {
      name: 'Frontenac Arch Biosphere Office',
      description: '19 Reynolds Road, Lansdowne, ON. Open Monday to Friday 8:30am - 4:30pm'
    }
  },
  queryParams: {
    fields: 'name,description,geom',
    table: 'office'
  },
  trailParams: {
    center: { lng: -76.04, lat: 44.508 },
    zoom: 13
  },
  trailZoom: 10
}
