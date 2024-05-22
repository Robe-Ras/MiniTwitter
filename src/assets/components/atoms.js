import { atom } from 'jotai';

export const postsAtom = atom([]); 
export const userAtom = atom({ username: '', email: '', description: '', password: '', profilePicture: '' });
export const userDataAtom = atom({ username: '', email: '', description: '', password: '', profilePicture: '' });

