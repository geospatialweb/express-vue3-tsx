import { Container } from 'typedi'

import { AuthorizationService } from '@/services'

describe('AuthorizationService test suite', () => {
  test('getMapboxAccessToken method should be called with a return', async () => {
    const authorization = Container.get(AuthorizationService)
    const spy = vi.spyOn(authorization, 'getMapboxAccessToken')
    await authorization.getMapboxAccessToken()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveReturnedTimes(1)
  })
})
