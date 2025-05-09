import { reactive, ref } from 'vue'
import { APP } from '../../../../helper/APP'
import { makeHttpRequest, type HttpRequestOptions } from '../../../../helper/makeHttpReq'
import { showError } from '../../../../helper/ToastNotification'

export interface ILoginInput {
  email: string
  password: string
}
export type LoginResponseType = {
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
  const options: HttpRequestOptions<ILoginInput> = {
    method: 'POST' as const,
    endpoint: 'login',
    input: loginInput,
    headers: {},
  }
  async function loginUser() {
    try {
      loading.value = true
      const data = await makeHttpRequest<ILoginInput, LoginResponseType>(options)
      if (data.isLogged) {
        loginInput.email = ''
        loginInput.password = ''
        localStorage.setItem('userData', JSON.stringify(data))
        localStorage.setItem('token', data.token)
        localStorage.setItem('isLogged', JSON.stringify(data.isLogged))
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
