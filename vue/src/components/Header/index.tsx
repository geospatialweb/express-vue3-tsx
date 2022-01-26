import { defineComponent } from 'vue'

import { header, name, title } from './index.module.css'

export default defineComponent({
  render(): JSX.Element {
    return (
      <header class={header}>
        <img src="/icons/logo.png" alt="Geospatial Web Logo" />
        <div id="name" class={name} aria-labelledby="name">
          Geospatial Web
        </div>
        <div id="title" class={title} aria-labelledby="title">
          Express&ensp;API&ensp;&#45;&ensp;Vue 3&ensp;Composition&ensp;API&ensp;&#45;&ensp;TSX
        </div>
        <a
          aria-label="GitLab Repository Link"
          href="https://gitlab.com/geospatialweb/express-vue3-tsx"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitLab Repository
        </a>
      </header>
    )
  }
})
