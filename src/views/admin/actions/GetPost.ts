import { ref } from 'vue'
import { makeHttpRequest } from '../../../../helper/makeHttpReq'
import { showError } from '../../../../helper/ToastNotification'

export type GetPostResponseType = {
  id: number
  title: string
  post_content: string
  slug: string
  image: string
}
export function useGetPost() {
  const loading = ref(false)
  const posts = ref<Array<GetPostResponseType>>([])

  async function getPost() {
    try {
      loading.value = true
      const data = await makeHttpRequest<undefined, { data: Array<GetPostResponseType> }>({
        method: 'GET',
        endpoint: 'posts',
        input: undefined,
      })

      posts.value = data.data
    } catch (error) {
      console.error('Error creating post:', error)
      showError(error instanceof Error ? error.message : 'Failed to get post')
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    posts,
    getPost,
  }
}
