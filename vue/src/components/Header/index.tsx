import { defineComponent } from 'vue'

import styles from './index.module.css'

export default defineComponent({
  setup() {
    const { header, name, title } = styles
    return (): JSX.Element => (
      <header class={header}>
        <img src="/icons/logo.png" alt="Geospatial Web Logo" />
        <div id="name" class={name}>
          Geospatial Web
        </div>
        <div id="title" class={title}>
          Express&ensp;API&ensp;&#45;&ensp;Vue 3&ensp;Composition&ensp;API&ensp;&#45;&ensp;TSX
        </div>
        <a
          href="https://gitlab.com/geospatialweb/express-vue3-tsx"
          rel="noopener noreferrer"
          target="_blank"
          title="Check out the source code"
        >
          GitLab Repository
        </a>
      </header>
    )
  }
})
