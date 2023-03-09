import { BrowserHistory, createBrowserHistory } from 'history';
import create from 'zustand';

interface IRootStore {
  showHeader: boolean;
  history: BrowserHistory;
  showHint: boolean;
  reverseShowHint: () => void;
  edgeSiteIP: string;
  setEdgeSiteIP: (ip: string) => void;
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
  edgeSiteIP: '',
  setEdgeSiteIP: (ip: string) =>
    set({
      edgeSiteIP: ip,
    }),
}));

export { useRootStore };
