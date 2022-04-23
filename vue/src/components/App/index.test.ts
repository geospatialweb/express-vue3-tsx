import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { App, Header } from '@/components'
import { Mapbox, Deckgl } from '@/views'

describe('App component test suite', () => {
  const baseUrl = import.meta.env.BASE_URL
  const history = createWebHistory(baseUrl)
  const routes: RouteRecordRaw[] = [
    {
      path: baseUrl,
      component: Mapbox
    },
    {
      path: `${baseUrl}deckgl`,
      component: Deckgl
    },
    {
      path: `${baseUrl}:catchAll(.*)`,
      redirect: baseUrl
    }
  ]
  const router = createRouter({ history, routes })

  test('App should render successfully', () => {
    render(App, {
      global: {
        plugins: [router]
      }
    })
    const app = screen.getByRole('presentation')
    expect(app).toBeInTheDocument()
  })

  test('Header should render successfully', () => {
    render(Header)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })
})
