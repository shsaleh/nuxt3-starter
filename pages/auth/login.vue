<template>
  <div>
    <a
      href="#"
      target="_self"
      class="brand-logo d-none d-sm-flex justify-end"
    ><h2 class="brand-text text-primary ma-5">پی سی ام بروکر</h2></a>
    <div
      class="d-flex justify-center pa-5"
    >
      <v-card
        class="mx-1 pa-8 pa-md-12 pb-8"
        elevation="8"
        width="500"
        rounded="lg"
      >
        <template #title>
          <a
            href="#"
            target="_self"
            class="brand-logo d-flex d-sm-none justify-center"
          ><h4 class="brand-text text-primary mb-3"> پی سی ام بروکر </h4></a>
          <p class="h5 font-weight-bold mb-1 text-center">
            به پنل ادمین  خوش آمدید
          </p>
        </template>
        <div class="text-subtitle-1 text-medium-emphasis">
          {{ t("email") }}
        </div>

        <v-text-field
          v-model="email"
          density="compact"
          placeholder="Email address"
          variant="outlined"
        />
        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center"
        >
          {{ t("password") }}
        </div>
        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        />
        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forget password?</a>
        <div class="">
          <div class="form-check">
            <input
              id="defaultCheck1"
              class="form-check-input"
              type="checkbox"
              value=""
            >
            <label
              class="form-check-label text-grey grey-lighten-5 text-body-2"
              for="defaultCheck1"
            >
              Remember password ?
            </label>
          </div>
        </div>
        <v-btn
          class="mt-5"
          color="primary"
          size="large"
          block
          rounded="lg"
          :loading="loading"
          @click="login"
        >
          {{ t("sign_in") }}
        </v-btn>
        <v-card-text class="text-center">
          <p class="fs-12 text-muted mt-1">
            Dont have an account?
            <NuxtLink class="text-primary">
              Sign Up
            </NuxtLink>
          </p>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const loading = ref(false)
const visible = ref(false)
const email = ref('')
const password = ref('')
const login = async () => {
  console.log('login!')
}
</script>
