import axios from 'axios';
import { create, } from 'zustand';
import { getData } from './../../utils/utils';

interface State {
  count: number;
  name: string;
  user: {
    id: number;
    name: string;
  },
  data: any;
  increment: () => void;
  decrement: () => void;
  setName: (name: string) => void;
  setUserId: (id: number) => void;
  setUserName: (name: string) => void;
  getData: () => Promise<void>;
}





const useStore = create<State>((set, get) => ({
  count: 0,
  name: "",
  user: {
    id: 0,
    name: ""
  },
  data: [],
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
  setName: (name: string) => set(state => ({ ...state, name })),
  setUserId: (id: number) => set(state => ({ ...state, user: { ...state.user, id } })),
  setUserName: (name: string) => set(state => ({ ...state, user: { ...state.user, name } })),
  getData: async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      set(state => ({ data: response.data }));
    } catch (error) {
      console.log(error);
    }
  },


}));

export { useStore };
