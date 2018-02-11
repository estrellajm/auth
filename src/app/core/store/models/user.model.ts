export interface User {
    uid: string;
    displayName: string;
    photoURL?: string;
    loading?: boolean;
    error?: string;
}
export class User implements User {
    constructor(
        public uid: string,
        public displayName: string,
        public photoURL?: string) { }
}