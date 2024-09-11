<template>
  <div>
    <div class="d-flex justify-center pa-5">
      <v-card
        class="mx-1 pa-8 pa-md-12 pb-8"
        elevation="8"
        width="500"
        rounded="lg"
      >
        <p class="text-h6 mb-5">
          {{ t('twoFactor_text') }}
        </p>
        <div class="text-subtitle-1 text-medium-emphasis">
          {{ t("code") }}
        </div>
        <v-text-field
          density="compact"
          placeholder="Enter code"
          variant="outlined"
        />
        <v-btn
          class="text-none"
          color="blue-darken-4"
          variant="outlined"
          :disabled="counting"
          block
          @click="startCountdown"
        >
          <vue-countdown
            v-if="counting"
            v-slot="{ totalSeconds }"
            :time="10000"
            @end="onCountdownEnd"
          >
            {{ totalSeconds }}
          </vue-countdown>
          <span v-else>{{ t("resend") }}</span>
        </v-btn>
        <v-btn
          class="text-none mt-4"
          color="primary"
          block
        >
          {{ t("sign_in") }}
        </v-btn>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueCountdown from '@chenfengyuan/vue-countdown'

const { t } = useI18n()
const counting = ref(false)
function startCountdown() {
  counting.value = true
}
function onCountdownEnd() {
  counting.value = false
}
</script>
