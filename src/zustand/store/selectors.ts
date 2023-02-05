import { shallow } from 'zustand/shallow'
import { useStore } from './index'

const count = () => useStore(state => state.count, shallow);
const name = () => useStore(state => state.name, shallow);
const user = () => useStore(state => state.user, shallow);
const data = () => useStore(state => state.data, shallow)

export { count, name, user, data };
