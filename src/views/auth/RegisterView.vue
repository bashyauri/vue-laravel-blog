<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive } from 'vue'
import type { IRegisterInput } from './actions/CreateUser'

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
  // v$.value.$touch()
  // if (v$.value.$invalid) {
  //   return
  // }
  // try {
  //   // Call the API to register the user
  //   // await registerUserAPI(registerInput)
  //   console.log('User registered:', registerInput)
  // } catch (error) {
  //   console.error('Registration failed:', error)
  // }
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
              <div class="form-group" :class="{ error: v$.name.$errors.length }">
                <label for="name">Name</label>
                <input v-model="registerInput.name" class="form-control form-control-lg" />
                <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
              <div class="form-group" :class="{ error: v$.name.$errors.length }">
                <label for="name">Email</label>
                <input
                  v-model="registerInput.email"
                  type="email"
                  class="form-control form-control-lg"
                />
                <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
              <div class="form-group" :class="{ error: v$.name.$errors.length }">
                <label for="name">Password</label>
                <input
                  v-model="registerInput.password"
                  type="password"
                  class="form-control form-control-lg"
                />
                <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>

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
<style scoped>
.error-msg {
  color: red;
  font-size: 12px;
}
.input-errors {
  margin-top: 5px;
}
</style>
