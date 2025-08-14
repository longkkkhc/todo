import { User } from "../interfaces/user.interfaces";
declare const findByEmail: (email: string, select?: {
    email: number;
    password: number;
    name: number;
    status: number;
    roles: number;
}) => Promise<User>;
declare const removeKeyById: (id: string) => Promise<User>;
export { findByEmail, removeKeyById };
