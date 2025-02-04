import { User } from '@/types/db'
import { create } from 'zustand'

interface State {
  user: Partial<User>
}

interface Action {
  updateUser: (user: State['user']) => void
}

const useUserStore = create<State & Action>((set) => ({
  user: {},
  updateUser: (user) => set(() => ({ user })),
}))

export { useUserStore }
