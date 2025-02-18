export interface UserDTO {
  uid: string;
  name: string;
  email: string;
}

export const EMPTY_USER: UserDTO = {
  uid: '',
  name: '',
  email: '',
};
