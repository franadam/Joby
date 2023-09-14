interface User {
  name: string;
  email: string;
  password: string;
  isMember?: boolean;
}

interface Credentials {
  email: string;
  password: string;
}

interface UserAPI {
  email: string;
  lastName: string;
  location: string;
  name: string;
  token: string;
}

export type { User, UserAPI, Credentials };
