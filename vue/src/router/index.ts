import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { Deck, Mapbox } from '@/views'

const baseUrl = import.meta.env.BASE_URL
const history = createWebHistory(baseUrl)
const routes: RouteRecordRaw[] = [
  {
    path: baseUrl,
    name: 'mapbox',
    component: Mapbox
  },
  {
    path: `${baseUrl}deckgl`,
    name: 'deckgl',
    component: Deck
  },
  {
    path: `${baseUrl}:catchAll(.*)`,
    redirect: 'mapbox'
  }
]

export default createRouter({ history, routes })
