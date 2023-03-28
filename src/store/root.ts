import { BrowserHistory, createBrowserHistory } from 'history';
import Cookies from 'js-cookie';
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
  setNodeId: (id: string) => void;
  getNodeId: () => string | number;
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
    id: undefined,
  },
  reload: false,
  inited: false,
  setState: params => {
    set({
      ...params,
    });
  },
  setNodeId: (id: string) => {
    Cookies.set('nodeId', id);
  },
  getNodeId: () => {
    if (get().edgeSite.id) {
      return get().edgeSite.id;
    }
    return Cookies.get('nodeId') || undefined;
  },
}));

export { useRootStore };
