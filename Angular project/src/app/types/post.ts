
import { User } from './user';
import { Theme } from './theme';

export interface Post {
  likes: string[];
  _id: string;
  text: string;
  themeId: Theme;
  created_at: string;
  updatedAt: string;
  userId: User;
  __v: number;
}
