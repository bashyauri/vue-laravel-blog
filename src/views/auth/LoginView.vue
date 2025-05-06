<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

import ErrorComponent from '@/components/ErrorComponent.vue'
import { useLoginUser } from './actions/LoginUser'

import { showError } from '../../../helper/ToastNotification'
import BaseBtn from '@/components/BaseBtn.vue'

const rules = {
  email: { required, email },
  password: { required },
}
const { loading, loginUser, loginInput } = useLoginUser()

const v$ = useVuelidate(rules, loginInput)

const handleLogin = async () => {
  const result = await v$.value.$validate()
  loading.value = false
  if (!result) {
    showError('Validation failed:' + v$.value.$errors)
    return
  }
  await loginUser()
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
