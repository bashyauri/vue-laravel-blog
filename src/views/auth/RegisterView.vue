<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive } from 'vue'
import type { IRegisterInput } from './actions/CreateUser'
import ErrorComponent from '@/components/ErrorComponent.vue'

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

const registerUser = async () => {
  const result = await v$.value.$validate()
  if (!result) {
    console.log('Validation failed:', v$.value.$errors)
    return
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
                <button type="submit" class="btn btn-primary btn-lg w-100">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>
