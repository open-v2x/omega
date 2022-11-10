import create from 'zustand';

interface IRootStore {
  name: string;
  changeName: (name: string) => void;
}

const useRootStore = create<IRootStore>(set => ({
  name: '123',
  changeName: (names: string) => set(() => ({ name: names })),
}));

export { useRootStore };
