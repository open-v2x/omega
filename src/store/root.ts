import { BrowserHistory, createBrowserHistory } from 'history';
import create from 'zustand';
interface IRootStore {
  showHeader: boolean;
  history: BrowserHistory;
  showHint: boolean;
  reverseShowHint: () => void;
  edgeSite: Center.EdgeSiteItem;
  reload: boolean;
  setState: (params: any) => void;
  inited: boolean;
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
  reload: false,
  inited: false,
  setState: params => {
    set({
      ...params,
    });
  },
}));

export { useRootStore };
