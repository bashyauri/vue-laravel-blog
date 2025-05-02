<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive } from 'vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import { loginUser, type ILoginInput } from './actions/LoginUser'
import { ref } from 'vue'
import { showError, successMsg } from '../../../helper/ToastNotification'
import BaseBtn from '@/components/BaseBtn.vue'

const rules = {
  email: { required, email },
  password: { required },
}
const loginInput = reactive<ILoginInput>({
  email: '',
  password: '',
})

const v$ = useVuelidate(rules, loginInput)
const loading = ref(false)

const handleLogin = async () => {
  const result = await v$.value.$validate()
  loading.value = false
  if (!result) {
    showError('Validation failed:' + v$.value.$errors)
    return
  }
  try {
    loading.value = true
    const data = await loginUser(loginInput)

    v$.value.$reset()
    if (data.isLogged) {
      loginInput.email = ''
      loginInput.password = ''
      localStorage.setItem('token', data.token)
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
</script>

<template>
  <div class="row">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h2 align="center">Login</h2>
            <form action="" @submit.prevent="handleLogin">
              <ErrorComponent label="Email" :errors="v$.email.$errors">
                <input
                  v-model="loginInput.email"
                  type="email"
                  class="form-control form-control-lg"
                />
              </ErrorComponent>
              <ErrorComponent label="Password" :errors="v$.password.$errors">
                <input
                  v-model="loginInput.password"
                  type="password"
                  class="form-control form-control-lg"
                />
              </ErrorComponent>

              <br />

              <RouterLink to="/register">Register</RouterLink>

              <br /><br />

              <div class="form-group">
                <BaseBtn :loading="loading" label="Login" icon="check" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>
