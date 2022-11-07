import create from 'zustand';

interface IBearStore {
  name: string;
  changeName: (name: string) => void;
}

const useBearStore = create<IBearStore>(set => ({
  name: '123',
  changeName: (names: string) => set(() => ({ name: names })),
}));

export { useBearStore };
