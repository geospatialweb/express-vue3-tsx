import 'reflect-metadata'
import { createApp } from 'vue'

import { App } from '@/components'
import router from '@/router'
import '@/styles/screen.css'

createApp(App).use(router).mount('#app')
