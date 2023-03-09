import { celebrate, Joi } from 'celebrate'
import { Router } from 'express'

import { getGeoJSONFeatureCollection, getMapboxAccessToken } from '../handlers'

export function router(): Router {
  const router = Router()
  return router
    .use('/', Router())
    .get(
      '/geojson',
      celebrate({
        query: {
          columns: Joi.string().required(),
          table: Joi.string().required()
        }
      }),
      /*eslint-disable-next-line @typescript-eslint/no-misused-promises */
      getGeoJSONFeatureCollection
    )
    .get('/mapbox-access-token', getMapboxAccessToken)
}
