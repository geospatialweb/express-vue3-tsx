import { Service } from 'typedi'
import { Router } from 'vue-router'

import router from '@/router'

@Service()
export default class RouterService {
  private _router: Router = router

  async setRoute(name: string): Promise<void> {
    await this._router.push({ name })
  }
}
