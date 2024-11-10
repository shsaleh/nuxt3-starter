import type { Tuser } from '../libs/types/user'

export const useUserStore = defineStore<'userStore', { user: Tuser }>(
  'userStore',
  {
    state: () => ({
      user: {
        name: '',
        lastName: '',
        email: '',
        roles: [],
        is_two_factor: false,
      },
    }),
    actions: {
      setUser(user: Tuser) {
        this.user = user
      },
    },
  },
)
