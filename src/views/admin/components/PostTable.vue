<script lang="ts" setup>
import type { GetPostResponseType } from '../actions/GetPost'

defineProps<{
  posts: Array<GetPostResponseType>
}>()
</script>
<template>
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <td>ID</td>
        <td>Image</td>
        <td>Title</td>
        <td>Upload</td>
        <td>Edit</td>
        <td>Delete</td>
      </tr>
    </thead>

    <tbody>
      <tr v-for="post in posts" :key="post.id">
        <td>{{ post.id }}</td>
        <td>
          <img style="height: 55px" :src="post.image" />
        </td>
        <td>
          {{ post.title }}
        </td>

        <td>
          <button class="btn btn-info btn-sm">Upload</button>
        </td>
        <td>
          <button class="btn btn-outline-primary btn-sm">Edit</button>
        </td>
        <td>
          <button class="btn btn-outline-danger btn-sm">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
