import { Container } from 'typedi'
import { ComputedRef, computed, defineComponent } from 'vue'

import { IModal } from '@/interfaces'
import { ModalService } from '@/services'
import { active, inactive } from './index.module.css'

export default defineComponent({
  setup() {
    const getModalState = (): ComputedRef<IModal> => {
      const { state } = Container.get(ModalService)
      return computed((): IModal => state)
    }
    const jsx = ({ isActive }: IModal): JSX.Element => <div class={isActive ? active : inactive}></div>
    return (): JSX.Element => jsx(getModalState().value)
  }
})
