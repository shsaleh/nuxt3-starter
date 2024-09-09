export type Tuser = {
  name: string;
  lastName: string;
  email: string;
  roles?: Array<{
    permissions: Array<{ id: number; name: string }>;
  }>;
};
