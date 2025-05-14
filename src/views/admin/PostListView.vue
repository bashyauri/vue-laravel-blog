<script lang="ts" setup>
import { onMounted } from 'vue'
import PostTable from './components/PostTable.vue'
import { useGetPost } from './actions/GetPost'

const { posts, getPost } = useGetPost()

onMounted(async () => {
  await getPost()
})
</script>
<template>
  <div class="row">
    <div class="col-md-10">
      <div class="card">
        <div class="card-header">Post List</div>
        <div class="card-body"><PostTable :posts="posts" /></div>
      </div>
    </div>
  </div>
</template>
