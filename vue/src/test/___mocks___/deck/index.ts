import { Container } from 'typedi'

import { DeckglService } from '@/services'

export default function mockDeckImplementation(): void {
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
  const { deck, map } = Container.get(DeckglService)
  new DeckglService(deck, map)
}
