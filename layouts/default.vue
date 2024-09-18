<template>
  <div>
    <v-app-bar
      prominent
    >
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      />

      <v-toolbar-title>{{ route.meta.title }}</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      temporary
    >
      <v-list
        :lines="false"
      >
        <div
          v-for="item in items"
          :key="item.link+item.title+'navKey'"
        >
          <v-list-item
            v-if=" !item.childrens && (!item.permission || (item.permission && can(item.permission.action, item.permission.resource)))"
            :value="item"
            color="primary"
            :to="item.link"
          >
            <template #prepend>
              <v-icon :icon="item.icon" />
            </template>

            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>

          <v-list-group
            v-else
            :value="item.title"
          >
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                :title="item.title"
              >
                <template #prepend>
                  <v-icon :icon="item.icon" />
                </template>
              </v-list-item>
            </template>
            <div
              v-for="children in item.childrens"
              :key="children.link+children.title+'childrenNavKey'"
            >
              <v-list-item
                v-if="!children.permission || (children.permission && can(children.permission.action, children.permission.resource))"
                :value="item"
                color="primary"
                :to="children.link"
              >
                <template #prepend>
                  <v-icon :icon="children.icon" />
                </template>
                <v-list-item-title>
                  {{ children.title }}
                </v-list-item-title>
              </v-list-item>
            </div>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </div>
</template>

<script setup lang="ts">
import { useAbility } from '@casl/vue'
import { useNavigation } from '~/store/navigation'

const { can } = useAbility()
const route = useRoute()
const drawer = ref(false)
const navigation = useNavigation()
const items = ref(navigation.items.sort((a, b) => (a.order !== undefined && b.order !== undefined ? a.order - b.order : -1)))
</script>
