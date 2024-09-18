export type Tnavigation = {
  state: {
    items: {
      title: string;
      link: string;
      icon: string;
      permission?: { action: string; resource: string };
      order: number;
      childrens?: Tnavigation["state"]["items"];
    }[];
  };
  actions: { setItems: (items: Tnavigation["state"]["items"]) => void };
};
export const useNavigation = defineStore<
  "useNavigation",
  Tnavigation["state"],
  {},
  Tnavigation["actions"]
>("useNavigation", {
  state: () => ({
    items: [
      {
        title: "dashboard",
        link: "/",
        icon: "mdi-home",
        order: 0,
      },
    ],
  }),
  actions: {
    setItems(items: Tnavigation["state"]["items"]) {
      this.items = items;
    },
  },
});
