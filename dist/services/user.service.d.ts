import { User } from '../interfaces/user.interfaces';
export declare class UserService {
    static signup(email: String, password: string): Promise<{
        user: User;
        tokens: any;
    }>;
    static login: (email: string, password: string) => Promise<{
        user: User;
        tokens: any;
    }>;
    static logout: (userId: string) => Promise<{
        message: string;
    }>;
}
