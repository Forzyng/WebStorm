<template>
  <div>
    <form>
      <div class="text-center mb-3">
        <p>Sign up with:</p>
        <button type="button" class="btn btn-link btn-floating mx-1">
          <i class="fab fa-facebook-f"></i>
        </button>

        <button type="button" class="btn btn-link btn-floating mx-1">
          <i class="fab fa-google"></i>
        </button>

        <button type="button" class="btn btn-link btn-floating mx-1">
          <i class="fab fa-twitter"></i>
        </button>

        <button type="button" class="btn btn-link btn-floating mx-1">
          <i class="fab fa-github"></i>
        </button>
      </div>

      <!-- Email input -->
      <div class="form-outline mb-4">
        <input v-model="email" type="email" id="registerEmail" class="form-control" />
        <label class="form-label" for="registerEmail">Email</label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input v-model="password" type="password" id="registerPassword" class="form-control" />
        <label class="form-label" for="registerPassword">Password</label>
      </div>

      <!-- Repeat Password input -->
      <div class="form-outline mb-4">
        <input v-model="repeatPassword" type="password" id="registerRepeatPassword" class="form-control" />
        <label class="form-label" for="registerRepeatPassword">Repeat password</label>
      </div>

      <!-- Checkbox -->
      <div class="form-check d-flex justify-content-center mb-4">
        <input v-model="registerCheck" class="form-check-input me-2" type="checkbox" value="" id="registerCheck"
               aria-describedby="registerCheckHelpText" />
        <label class="form-check-label" for="registerCheck">
          I have read and agree to the terms
        </label>
      </div>

      <!-- Submit button -->
      <button @click="tryCreateUser" :disabled=canSendForm type="submit" class="btn btn-primary btn-block mb-3">Sign in</button>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'MyRegister',
  setup () {
    const store = useStore()
    return {
      tryCreateUser: function () {
        store.dispatch('apiTryCrateUser')
      },
      canSendForm: computed(() => !store.getters.canRegister),
      email: computed({
        get () {
          return store.getters.email
        },
        set (data) {
          store.dispatch('email', data)
        }
      }),
      password: computed({
        get () {
          return store.getters.password
        },
        set (data) {
          store.dispatch('password', data)
        }
      }),
      repeatPassword: computed({
        get () {
          return store.getters.repeatPassword
        },
        set (data) {
          store.dispatch('repeatPassword', data)
        }
      }),
      registerCheck: computed({
        get () {
          return store.getters.registerCheck
        },
        set (data) {
          store.dispatch('registerCheck', data)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
