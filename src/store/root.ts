import { BrowserHistory, createBrowserHistory } from 'history';
import create from 'zustand';

interface IRootStore {
  showHeader: boolean;
  history: BrowserHistory;
}

const useRootStore = create<IRootStore>(() => ({
  showHeader: true,
  history: createBrowserHistory(),
}));

export { useRootStore };
