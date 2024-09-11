<template>
  <div>
    <a
      href="#"
      target="_self"
      class="brand-logo d-none d-sm-flex justify-end"
    >
      <h2 class="brand-text text-primary ma-5">پی سی ام بروکر</h2>
    </a>
    <div class="d-flex justify-center pa-5">
      <v-card
        class="mx-1 pa-8 pa-md-12 pb-8"
        elevation="8"
        width="500"
        rounded="lg"
      >
        <template #title>
          <!-- <div class="d-flex justify-end">
            <v-menu>
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                >
                  فارسی
                </v-btn>
              </template>
<v-list>
  <v-list-item v-for="(item, index) in items" :key="index" :value="index" :append-avatar="item.img">
    <v-list-item-title>{{ item.title }}</v-list-item-title>
  </v-list-item>
</v-list>
</v-menu>
</div> -->
          <a
            href="#"
            target="_self"
            class="brand-logo d-flex d-sm-none justify-center"
          >
            <h4 class="brand-text text-primary mb-3"> پی سی ام بروکر </h4>
          </a>

          <p class="h5 font-weight-bold mb-1 text-center">
            {{ t("welcome_to_admin_panel") }}
          </p>
        </template>
        <v-form ref="form">
          <div class="text-subtitle-1 text-medium-emphasis">
            {{ t("email") }}
          </div>
          <v-text-field
            v-model="email"
            :rules="[isEmail]"
            density="compact"
            placeholder="Email address"
            variant="outlined"
          />
          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center">
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
            :rules="[isPassword]"
            @click:append-inner="visible = !visible"
          />
          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ t("forget_password") }}</a>
          <div class="">
            <div class="form-check">
              <input
                id="defaultCheck1"
                class="form-check-input"
                type="checkbox"
                value=""
              >
              <label
                class="form-check-label text-grey grey-lighten-5 text-body-2 mx-1"
                for="defaultCheck1"
              >
                {{ t("remember_me") }}
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
        </v-form>
        <v-card-text class="text-center">
          <p class="fs-12 text-muted mt-1">
            {{ t("dont_have_account") }}
            <NuxtLink class="text-primary">
              {{ t("sign_up") }}
            </NuxtLink>
          </p>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isEmail, isPassword } from '@/libs/form/rules'

const { t } = useI18n()
const loading = ref(false)
const visible = ref(false)
const email = ref('')
const password = ref('')
const loginApi = useLogin()
const form = ref()
const router = useRouter()
const localePath = useLocalePath()
// const items = ref([
//   { title: 'فارسی', img: 'https://parspng.com/wp-content/uploads/2021/10/iranpng.parspng.com-3.png' },
//   { title: 'فارسی', img: 'https://parspng.com/wp-content/uploads/2021/10/iranpng.parspng.com-3.png' },
// ])
const login = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    loading.value = true
    const { data, error } = await loginApi({ email: email.value, password: password.value })
    loading.value = false

    if (error.value) {
      console.log(error.value)
      return
    }

    if (data.value) {
      const token = useCookie('token')
      token.value = data.value.results.token
      router.push(localePath('/'))
    }
  }
}
</script>
