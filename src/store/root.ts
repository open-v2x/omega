import { BrowserHistory, createBrowserHistory } from 'history';
import create from 'zustand';
interface IRootStore {
  showHeader: boolean;
  history: BrowserHistory;
  showHint: boolean;
  reverseShowHint: () => void;
  edgeSite: Center.EdgeSiteItem;
  setEdgeSite: (edge: Center.EdgeSiteItem) => void;
  reload: boolean;
  setReload: (reload: boolean) => void;
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
  edgeSite: {
    name: '',
    ip: '',
    id: -1,
  },
  setEdgeSite: (edge: Center.EdgeSiteItem) => {
    set({
      edgeSite: edge,
    });
  },
  reload: false,
  setReload: r => set({ reload: r }),
}));

export { useRootStore };
