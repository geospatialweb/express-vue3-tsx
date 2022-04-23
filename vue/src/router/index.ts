import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { Mapbox, Deckgl } from '@/views'

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
    component: Deckgl
  },
  {
    path: `${baseUrl}:catchAll(.*)`,
    redirect: baseUrl
  }
]

export default createRouter({ history, routes })
