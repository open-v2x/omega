import { BrowserHistory, createBrowserHistory } from 'history';
import create from 'zustand';

interface IRootStore {
  showHeader: boolean;
  history: BrowserHistory;
  showHint: boolean;
  reverseShowHint: () => void;
}

const useRootStore = create<IRootStore>((set, get) => ({
  showHeader: true,
  history: createBrowserHistory(),
  showHint: false,
  reverseShowHint: () => {
    set({
      showHint: !get().showHint,
    });
  },
}));

export { useRootStore };
