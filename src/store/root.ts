import { BrowserHistory, createBrowserHistory } from 'history';
import create from 'zustand';

interface IRootStore {
  showHeader: boolean;
  history: BrowserHistory;
}

const useRootStore = create<IRootStore>(set => ({
  showHeader: true,
  history: createBrowserHistory(),
}));

export { useRootStore };
