import { APP } from '../../../../helper/APP'
import { makeHttpReq } from '../../../../helper/makeHttpReq'
import { showError, successMsg } from '../../../../helper/ToastNotification'
import { reactive, ref } from 'vue'
export interface IRegisterInput {
  name: string
  email: string
  password: string
}

export interface IRegisterResponseType {
  user: {
    id: number
    name: string
    email: string
  }
  message: string
}
const registerInput = reactive<IRegisterInput>({
  name: '',
  email: '',
  password: '',
})
export function useCreateUser() {
  const loading = ref(false)

  async function createUser() {
    try {
      loading.value = true
      const data = await makeHttpReq<IRegisterInput, IRegisterResponseType>(
        'register',
        'POST',
        registerInput,
      )
      successMsg(data.message)

      registerInput.name = ''
      registerInput.email = ''
      registerInput.password = ''
    } catch (error) {
      showError((error as Error).message)
    } finally {
      loading.value = false
    }
  }
  return { loading, createUser, registerInput }
}
