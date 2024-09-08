<template>
  <div>
    <v-app>
      <v-locale-provider :rtl="localeProperties.dir === 'rtl'">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </v-locale-provider>
    </v-app>
  </div>
</template>

<script setup lang="ts">
const { localeProperties } = useI18n()
</script>
