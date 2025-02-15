import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { Deck, Mapbox } from '@/views'

describe('router test suite', () => {
  const baseUrl = import.meta.env.BASE_URL
  const history = createWebHistory(baseUrl)
  const routes: RouteRecordRaw[] = [
    {
      path: baseUrl,
      component: Mapbox
    },
    {
      path: `${baseUrl}deckgl`,
      component: Deck
    },
    {
      path: `${baseUrl}:catchAll(.*)`,
      redirect: baseUrl
    }
  ]
  const router = createRouter({ history, routes })

  test('set baseUrl route', async () => {
    render(Mapbox, {
      global: {
        plugins: [router]
      }
    })
    const mapbox = screen.getAllByRole('presentation')[0]
    await router.push(baseUrl)
    expect(mapbox).toBeInTheDocument()
  })

  test('set deckgl route', async () => {
    render(Deck, {
      global: {
        plugins: [router]
      }
    })
    const deckgl = screen.getAllByRole('presentation')[0]
    await router.push(`${baseUrl}deckgl`)
    expect(deckgl).toBeInTheDocument()
  })

  test('set redirect route', async () => {
    render(Mapbox, {
      global: {
        plugins: [router]
      }
    })
    const mapbox = screen.getAllByRole('presentation')[0]
    await router.push(`${baseUrl}abc`)
    expect(mapbox).toBeInTheDocument()
  })
})
