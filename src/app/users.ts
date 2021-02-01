export interface Users {
  userID: number;
  positionID: number;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
}
export interface UsersSelect {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
  packageID: number;
  package_name: string;
  price: number;
  number: number;
  number_register: number;
}
