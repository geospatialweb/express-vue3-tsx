import { Request, Response } from 'express'
import { Container } from 'typedi'

import { ControllerService } from '../services'

export async function getGeoJsonFeatureCollection(req: Request, res: Response): Promise<Response> {
  const controllerService: ControllerService = Container.get(ControllerService)
  return await controllerService.getGeoJsonFeatureCollection(req, res)
}
export function getMapboxAccessToken(req: Request, res: Response): Response {
  const controllerService: ControllerService = Container.get(ControllerService)
  return controllerService.getMapboxAccessToken(req, res)
}
