import { Container } from 'typedi'

import { DeckglService } from '@/services'
import { mockDeckImplementation } from '@/test'

describe('DeckglService test suite', () => {
  let deckglService: DeckglService

  beforeEach(() => {
    deckglService = Container.get(DeckglService)
  })

  test('loadDeckgl method should be called', () => {
    const spy = vi.spyOn(deckglService, 'loadDeckgl').mockImplementation(mockDeckImplementation)
    deckglService.loadDeckgl()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('removeDeckInstance method should be called', () => {
    const spy = vi.spyOn(deckglService, 'removeDeckInstance').mockImplementation(mockDeckImplementation)
    deckglService.removeDeckInstance()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('loadMapbox method should be called', () => {
    const spy = vi.spyOn(deckglService, 'loadMapbox').mockImplementation(mockDeckImplementation)
    deckglService.loadMapbox()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('removeMapInstance method should be called', () => {
    const spy = vi.spyOn(deckglService, 'removeMapInstance').mockImplementation(mockDeckImplementation)
    deckglService.removeMapInstance()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
