import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { useAbility } from "@casl/vue";
import { useUserStore } from "../store/user";
export default defineNuxtPlugin((nuxtApp) => {
  const userStore = useUserStore();
  const ability = useAbility();

watch(
    () => userStore.user.roles,
    (roles) => {
      if (roles && roles.length > 0) {

        const Fpermissions = userStore.user.roles?.flatMap((role) => {
          return role.permissions.map((permission) => {
            const splitedPermission = permission.name.split("-").reverse();
            if (splitedPermission.length !== 2) {
              console.error(
                "the permission string is wrong. it may has no dash or more then one dash in it.",
                permission
              );
            }
            return splitedPermission as [string, string];
          });
        });
        
        const { can, rules } = new AbilityBuilder(createMongoAbility);
        Fpermissions?.forEach((fp) => {
          can(...fp);
        });
        ability.update(rules);
      }
    }
  );
});