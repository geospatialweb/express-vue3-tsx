import { celebrate, Joi } from 'celebrate'
import { Router } from 'express'

import { getGeoJsonFeatureCollection, getMapboxAccessToken } from '../controllers'

export function router(): Router {
  const router = Router()
  return router
    .use('/', Router())
    .get(
      '/geojson',
      celebrate({
        query: {
          fields: Joi.string().required(),
          table: Joi.string().required()
        }
      }),
      getGeoJsonFeatureCollection
    )
    .get('/mapbox-access-token', getMapboxAccessToken)
}
