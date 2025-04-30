<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core'

defineProps<{
  label: string
  errors: ErrorObject[]
}>()
</script>

<template>
  <div class="form-group" :class="{ error: errors.length }">
    <label for="name">{{ label }}</label>
    <slot></slot>
    <div class="input-errors" v-for="error of errors" :key="error.$uid">
      <div class="error-msg">{{ error.$message }}</div>
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
