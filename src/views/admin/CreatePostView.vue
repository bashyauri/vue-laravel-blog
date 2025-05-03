<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { reactive } from 'vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import { ref } from 'vue'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { showError, successMsg } from '../../../helper/ToastNotification'
import BaseBtn from '@/components/BaseBtn.vue'
import type { ICreatePostInput } from './actions/CreatePost'

const rules = {
  title: { required },
  post_content: { required },
}
const postInput = reactive<ICreatePostInput>({
  title: '',
  post_content: '',
})

const v$ = useVuelidate(rules, postInput)

const editor = ref(ClassicEditor)
const loading = ref(false)

const handleCreatePost = async () => {
  const result = await v$.value.$validate()
  loading.value = false
  if (!result) {
    showError('Validation failed:' + v$.value.$errors)
    return
  }
}
</script>
<template>
  <div class="row">
    <div class="col-md-10">
      <div class="card">
        <div class="card-header">Create Post</div>
        <!-- {{ postStore.postData }} -->
        <div class="card-body">
          <form action="" @submit.prevent="handleCreatePost">
            <ErrorComponent label="Post-Title" :errors="v$.title.$errors">
              <input v-model="postInput.title" class="form-control form-control-lg" />
            </ErrorComponent>
            <ErrorComponent label="Post-Content" :errors="v$.post_content.$errors">
              <ckeditor :editor="editor" v-model="postInput.post_content" />
            </ErrorComponent>
            <br />
            <br />

            <BaseBtn
              :class="postInput.edit ? 'btn btn-warning' : 'btn btn-primary'"
              :label="postInput.edit ? 'Update Post' : 'Create Post'"
              :loading="loading"
              icon="default-icon"
            >
            </BaseBtn>
          </form>
        </div>
      </div>
    </div>
    <div class="col-md-4"></div>
  </div>
</template>
