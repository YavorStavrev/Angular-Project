import { Post } from './post';
import { User } from './user';

export interface Theme {
  likes: string[];
  likesCount: number;
  workout: {
    exercise: string[];
    sets: string[];
  };
  posts: Post[];
  _id: string;
  themeName: string;
  description: string;
  userId: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}
