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
  setNode: (edge: Center.EdgeSiteItem) => void;
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
  setNode: edge => {
    Cookies.set('enode', encodeURIComponent(JSON.stringify(edge)));
  },
  getNodeId: () => {
    if (get().edgeSite.id) {
      return get().edgeSite.id;
    }
    const enode = Cookies.get('enode');
    const edge = JSON.parse(decodeURIComponent(enode));

    return edge.id || undefined;
  },
}));

export { useRootStore };
