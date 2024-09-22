<template>
  <div>
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
            <a
              href="#"
              target="_self"
              class="brand-logo d-flex d-sm-none justify-center"
            >
              <h4 class="brand-text text-primary mb-3">پی سی ام بروکر</h4>
            </a>

            <p class="h5 font-weight-bold mb-1 text-center">
              {{ t("welcome_to_admin_panel") }}
            </p>
          </template>
          <v-form ref="form">
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <div class="text-subtitle-1 text-medium-emphasis">
                  {{ t("name") }}
                </div>
                <v-text-field
                  density="compact"
                  placeholder="name address"
                  variant="outlined"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <div class="text-subtitle-1 text-medium-emphasis">
                  {{ t("last name") }}
                </div>
                <v-text-field
                  density="compact"
                  placeholder="last name"
                  variant="outlined"
                />
              </v-col>
            </v-row>

            <div class="text-subtitle-1 text-medium-emphasis">
              {{ t("email") }}
            </div>
            <v-text-field
              v-model="email"
              density="compact"
              placeholder="abc@gmail.com"
              variant="outlined"
              :rules="[isEmail]"
            />
            <div id="app">
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
                variant="outlined"
                :rules="[isPassword]"
                @click:append-inner="visible = !visible"
              />
              <password-meter
                :password="password"
                @score="onScore"
              />
            </div>

            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center"
            >
              {{ t("confirm password") }}
            </div>
            <v-text-field
              v-model="confirmPassword"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Enter your password"
              variant="outlined"
              :rules="[(value: string) => passwordConfirmation(value, password)]"
              @click:append-inner="visible = !visible"
            />
            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center"
            >
              {{ t("Mobile Country Code") }}
            </div>
            <v-select
              placeholder="Mobile Country Code"
              density="compact"
              :items="[
                'California',
                'Colorado',
                'Florida',
                'Georgia',
                'Texas',
                'Wyoming',
              ]"
              variant="outlined"
            />
            <div class="text-subtitle-1 te xt-medium-emphasis">
              {{ t("mobile number") }}
            </div>
            <div class="d-md-flex">
              <v-text-field
                v-model="mobilenumber"
                density="compact"
                placeholder="9132504565"
                variant="outlined"
                :rules="[noZeroStater]"
              />
              <v-btn
                color="success"
                rounded="lg"
                :loading="loading"
                class="ml-2"
              >
                {{ t("send code") }}
              </v-btn>
            </div>
            <div class="text-subtitle-1 text-medium-emphasis">
              {{ t("verification code") }}
            </div>
            <v-text-field
              density="compact"
              placeholder="0000"
              variant="outlined"
              :rules="[isVerificationCode]"
            />
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
                  {{ t("I agree to") }}
                </label>
                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                >
                  <template #activator="{ props: activatorProps }">
                    <NuxtLink
                      class="text-primary cursor-pointer"
                      v-bind="activatorProps"
                    >{{ t("privacy policy & terms") }}</NuxtLink>
                  </template>
                  <siteTerms @ok="closeDialog" />
                </v-dialog>
              </div>
            </div>
            <v-btn
              class="mt-5"
              color="primary"
              size="large"
              block
              rounded="lg"
              :loading="loading"
              @click="submit"
            >
              {{ t("sign up") }}
            </v-btn>
          </v-form>
          <v-card-text class="text-center">
            <p class="fs-12 text-muted mt-1">
              {{ t("Already have an account?") }}
              <NuxtLink
                to="userLogin"
                class="text-primary"
              >
                {{ t("Sign in instead") }}
              </NuxtLink>
            </p>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PasswordMeter from 'vue-simple-password-meter'
import {
  isEmail,
  isPassword,
  noZeroStater,
  passwordConfirmation,
  isVerificationCode,
} from '@/libs/form/rules'
import siteTerms from '@/layers/auth/components/siteTerms.vue'

definePageMeta({
  layout: 'basic',
})
const { t } = useI18n()
const loading = ref(false)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const mobilenumber = ref('')
const visible = ref(false)
const score = ref(0)
const dialog = ref(false)

function onScore(payload: { score: number }) {
  score.value = payload.score
}
const closeDialog = () => {
  dialog.value = false
}
const submit = async () => {
  // const { data, error } = await registerApi({
  //   password: score.value >= 4 ? score.value : '',
  //   email: email.value,
  //   password: password.value,
  // })
  // if (error.value) {
  //   console.log(error.value)
  //   return
  // }
}
</script>
