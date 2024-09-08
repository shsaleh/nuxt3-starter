export type Tuser = {
  name: string;
  lastName: string;
  roles?: Array<{
    permissions: Array<{ id: number; name: string }>;
  }>;
};
