<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import ErrorComponent from '@/components/ErrorComponent.vue'
import BaseBtn from '@/components/BaseBtn.vue'
import { showError } from '../../../helper/ToastNotification'
import { useCreatePost } from './actions/CreatePost'

// Editor configuration
const editor = ref(ClassicEditor)
const editorConfig = {
  // Add your CKEditor config here if needed
}

// Validation rules
const rules = {
  title: { required },
  post_content: { required },
}

// Composable
const { loading, createPost, postInput } = useCreatePost()
const v$ = useVuelidate(rules, postInput)

// Form submission handler
const handleCreatePost = async () => {
  const isValid = await v$.value.$validate()

  if (!isValid) {
    const errorMessages = v$.value.$errors.map((error) => error.$message).join(', ')
    showError(`Validation failed: ${errorMessages}`)
    return
  }

  try {
    loading.value = true
    await createPost()
  } catch (error) {
    console.error('Post creation error:', error)
  }
}
</script>

<template>
  <div class="row">
    <div class="col-md-10">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Create Post</h2>
        </div>

        <div class="card-body">
          <form @submit.prevent="handleCreatePost">
            <ErrorComponent label="Post Title" :errors="v$.title.$errors">
              <input
                v-model="postInput.title"
                class="form-control form-control-lg"
                placeholder="Enter post title"
                :disabled="loading"
              />
            </ErrorComponent>

            <ErrorComponent label="Post Content" :errors="v$.post_content.$errors">
              <ckeditor
                :editor="editor"
                v-model="postInput.post_content"
                :config="editorConfig"
                :disabled="loading"
              />
            </ErrorComponent>

            <div class="mt-4">
              <BaseBtn
                type="submit"
                :class="['btn', postInput.edit ? 'btn-warning' : 'btn-primary']"
                :label="postInput.edit ? 'Update Post' : 'Create Post'"
                :loading="loading"
                :disabled="loading"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-top: 20px;
}
.mt-4 {
  margin-top: 1.5rem;
}
</style>
