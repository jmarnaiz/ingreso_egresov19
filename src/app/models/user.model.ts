export interface UserDTO {
  uid: string;
  name: string;
  email: string;
}

export const EMPTY_USER: UserDTO = {
  uid: '0',
  name: '',
  email: '',
};
