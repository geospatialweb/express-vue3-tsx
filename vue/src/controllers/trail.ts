import { Container, Service } from 'typedi'

import { IEventTarget } from '@/interfaces'
import { TrailService } from '@/services'

@Service()
export default class TrailController {
  constructor(private _trailService: TrailService) {
    this._trailService = Container.get(TrailService)
  }

  addSelectTrailEventListener(): void {
    const el = document.getElementById('trail')
    el && el.addEventListener('change', (evt): void => this.onSelectTrailChangeHandler(evt))
  }

  removeSelectTrailEventListener(): void {
    const el = document.getElementById('trail')
    el && el.removeEventListener('change', (evt): void => this.onSelectTrailChangeHandler(evt))
  }

  private onSelectTrailChangeHandler(evt: Event): void {
    evt.stopPropagation()
    /* prettier-ignore */
    const { target: { value: trailName } }: IEventTarget = <any>evt
    trailName && this._trailService.selectTrail(trailName)
  }
}
