import { useStore } from './index'

const increment = () => useStore(state => state.increment());
const decrement = () => useStore(state => state.decrement());
const setName = (name: string) => useStore(state => state.setName(name));
const setUserId = (id: number) => useStore(state => state.setUserId(id));
const setUserName = (name: string) => useStore(state => state.setUserName(name));

export { increment, decrement, setName, setUserId, setUserName };
