export interface User {
  uid: string;
  displayName: string;
  photoURL?: string;
  shifts?: object;
  error?: string;
}
export class User implements User {
  constructor(
    public uid: string,
    public displayName: string,
    public shifts?: object,
    public photoURL?: string
  ) {}
}
