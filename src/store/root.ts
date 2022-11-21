import create from 'zustand';

interface IRootStore {
  showHeader: boolean;
}

const useRootStore = create<IRootStore>(set => ({
  showHeader: true,
}));

export { useRootStore };
