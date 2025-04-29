<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="row">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h2 align="center">Login</h2>
            <form action="">
              <div class="form-group mt-3">
                <label for="email">Email</label>
                <input
                  id="email"
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div class="form-group mt-3">
                <label for="password">Password</label>
                <input
                  id="password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <br />

              <RouterLink to="/register">Register</RouterLink>

              <br /><br />

              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-lg w-100">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>
