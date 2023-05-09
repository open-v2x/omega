import { BrowserHistory, createBrowserHistory } from 'history';
import Cookies from 'js-cookie';
import create from 'zustand';
interface IRootStore {
  showHeader: boolean;
  history: BrowserHistory;
  showHint: boolean;
  reverseShowHint: () => void;
  reload: boolean;
  setState: (params: any) => void;
  inited: boolean;
  setNode: (edge: Center.EdgeSiteItem | undefined) => void;
  getNodeId: () => string | number;
  getNodeIp: (params?: { noProtocol?: boolean; onlyHost?: boolean }) => string | undefined;
  globalConfig: any;
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
  reload: false,
  inited: false,
  setState: params => {
    set({
      ...params,
    });
  },
  setNode: edge => {
    if (edge) {
      Cookies.set('enode', encodeURIComponent(JSON.stringify(edge)), {
        expires: 1,
      });
    } else {
      Cookies.remove('enode');
    }
  },
  getNodeId: () => {
    const enode = Cookies.get('enode');
    if (enode) {
      const edge = JSON.parse(decodeURIComponent(enode));

      return edge.id || undefined;
    }
    return undefined;
  },
  getNodeIp: params => {
    const { noProtocol = false, onlyHost = false } = params || {};
    const enode = Cookies.get('enode');
    if (enode) {
      const edge = JSON.parse(decodeURIComponent(enode));
      const ip = edge.edgeSiteDandelionEndpoint;
      if (onlyHost && ip) {
        const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
        const match = ip.match(regex);
        if (match) return match[1];
      }
      if (noProtocol && ip) {
        const regex = /\/\/(.+)/;
        const match = ip.match(regex);
        if (match) return match[1];
      }
      return ip;
    }

    return undefined;
  },
  globalConfig: undefined,
}));

export { useRootStore };
