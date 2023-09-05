import { RoleEnum } from "./RoleEnum";

export class User {
    username: string;
    email: string;
    password: string
    role: RoleEnum;

    constructor(
        ) {
    this.role = RoleEnum.USER;
    }
}