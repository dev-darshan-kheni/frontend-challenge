import { atom } from 'recoil';

export type IPriorityLevel = 'low' | 'medium' | 'high';

export interface ITodo {
  id: number;
  text: string;
  starred: boolean;
  createdAt: string;
  completed: boolean;
  createdAtTime: string;
}

export const todoState = atom<ITodo[]>({
  key: 'todoState',
  default: [],
});
