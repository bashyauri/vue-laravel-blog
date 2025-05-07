import { reactive } from 'vue'
import { ref } from 'vue'
import { showError, successMsg } from '../../../../helper/ToastNotification'
import { makeHttpRequest } from '../../../../helper/makeHttpReq' // Note the renamed function

export interface ICreatePostInput {
  title: string
  post_content: string
}

export function useCreatePost() {
  const postInput = reactive<ICreatePostInput>({
    title: '',
    post_content: '',
  })

  const loading = ref(false)

  async function createPost() {
    try {
      loading.value = true
      const data = await makeHttpRequest<ICreatePostInput, { message: string }>({
        method: 'POST',
        endpoint: 'posts',
        input: postInput,
      })

      successMsg(data.message)

      // Reset form
      postInput.title = ''
      postInput.post_content = ''
    } catch (error) {
      console.error('Error creating post:', error)
      showError(error instanceof Error ? error.message : 'Failed to create post')
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    createPost,
    postInput,
  }
}
