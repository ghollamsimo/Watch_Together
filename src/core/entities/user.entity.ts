export enum Role{
    client = "client",
    admin = "admin",
}
export class UserEntity {
    constructor(
        public readonly name: unknown,
        public readonly email: string,
        public password: string,
        public role:string = Role.client,
    ) {}
}
