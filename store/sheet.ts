import { create } from 'zustand'

interface State {
  open: boolean;
}

interface Action {
  updateOpen: (open: State['open']) => void
}

const useOpenStore = create<State & Action>((set) => ({
  open: false,
  updateOpen: (open) => set(() => ({ open })),
}))

export { useOpenStore }
