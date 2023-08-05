import { RoleEnum } from "./RoleEnum";

export class User {
    username: string;
    email: string;
    password: string
    role: RoleEnum;

    constructor(
        username: string,
        email: string,
        password: string,
        role: RoleEnum) {
    this.username = username;
    this.email = email;
    this.password = password
    this.role = role;
    }
}