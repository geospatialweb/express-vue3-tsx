import { Container } from 'typedi'

import { MapService, MapboxService } from '@/services'

export default function mockMapImplementation(): void {
  const { map } = Container.get(MapboxService)
  new MapService(map)
}
