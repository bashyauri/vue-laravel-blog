<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, ref } from 'vue'
import { createUser, type IRegisterInput } from './actions/CreateUser'

import ErrorComponent from '@/components/ErrorComponent.vue'
import { showError, successMsg } from '../../../helper/ToastNotification'
import BaseBtn from '@/components/BaseBtn.vue'

const rules = {
  name: { required },
  email: { required, email },
  password: { required },
}
const registerInput = reactive<IRegisterInput>({
  name: '',
  email: '',
  password: '',
})

const v$ = useVuelidate(rules, registerInput)
const loading = ref(false)

const registerUser = async () => {
  const result = await v$.value.$validate()

  if (!result) {
    console.log('Validation failed:', v$.value.$errors)
    return
  }

  try {
    loading.value = true
    const data = await createUser(registerInput)
    successMsg(data.message)
    v$.value.$reset()
    registerInput.name = ''
    registerInput.email = ''
    registerInput.password = ''
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
            <h2 align="center">Register</h2>

            <form action="" @submit.prevent="registerUser">
              <ErrorComponent label="Name" :errors="v$.name.$errors">
                <input v-model="registerInput.name" class="form-control form-control-lg" />
              </ErrorComponent>

              <ErrorComponent label="Email" :errors="v$.email.$errors">
                <input
                  v-model="registerInput.email"
                  type="email"
                  class="form-control form-control-lg"
                />
              </ErrorComponent>
              <ErrorComponent label="Password" :errors="v$.password.$errors">
                <input
                  v-model="registerInput.password"
                  type="password"
                  class="form-control form-control-lg"
                />
              </ErrorComponent>

              <br />

              <RouterLink to="/login">Login into your account</RouterLink>

              <br /><br />

              <div class="form-group">
                <BaseBtn :loading="loading" label="Login" icon="check" />
                <!-- <button class="btn btn-primary w-100">
                  <i class="bi bi-home"></i>
                  <span>Register</span>
                  <div class="d-flex justify-content-center">
                    <div :class="`spinner-border`" role="status">
                      <span class="visually-hidden">Loading... </span>
                    </div>
                  </div>
                </button> -->
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>
