import { Role } from "./role";

export class User {
    id: number;
    username: string;
    role: Role;
    token?: string;
}