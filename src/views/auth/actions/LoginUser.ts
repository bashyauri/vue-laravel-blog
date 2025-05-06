import { reactive, ref } from 'vue'
import { APP } from '../../../../helper/APP'
import { makeHttpReq } from '../../../../helper/makeHttpReq'
import { showError } from '../../../../helper/ToastNotification'

export interface ILoginInput {
  email: string
  password: string
}
export interface ILoginResponseType {
  user: {
    id: number
    name: string
    email: string
  }
  token: string
  message: string
  isLogged: boolean
}
const loginInput = reactive<ILoginInput>({
  email: '',
  password: '',
})
export function useLoginUser() {
  const loading = ref(false)
  async function loginUser() {
    try {
      loading.value = true
      const data = await makeHttpReq<ILoginInput, ILoginResponseType>('login', 'POST', loginInput)
      if (data.isLogged) {
        loginInput.email = ''
        loginInput.password = ''
        localStorage.setItem('userData', JSON.stringify(data.user))
        window.location.href = '/admin'
        // successMsg(data.message)
      } else {
        showError(data.message)
      }
    } catch (error) {
      showError((error as Error).message)
    } finally {
      loading.value = false
    }
  }
  return { loading, loginUser, loginInput }
}
