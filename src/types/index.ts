
export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface UserState {
  user: User | null; 
  addUser: (user: User) => void; 
  removeUser: () => void; 
}