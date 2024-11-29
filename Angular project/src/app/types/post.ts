
import { User } from "./user";


export interface Post {
    name: string;
    likes: string[];
    _id: string;
    description: string;
    userId: User;
    created_at: string;
    updatedAt: string;
    __v: number;
}