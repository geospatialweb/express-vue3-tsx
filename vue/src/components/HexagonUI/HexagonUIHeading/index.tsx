import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true
    }
  },
  setup({ text }) {
    return (): JSX.Element => <h1>{text}</h1>
  }
})
