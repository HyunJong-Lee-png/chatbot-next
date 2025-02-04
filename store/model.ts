import { create } from 'zustand'

interface State {
  model: string
}

interface Action {
  updateModel: (model: State['model']) => void
}

const useModelStore = create<State & Action>((set) => ({
  model: 'gpt-4',
  updateModel: (model) => set(() => ({ model })),
}))

export { useModelStore }
