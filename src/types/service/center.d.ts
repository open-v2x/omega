declare namespace Center {
  type EdgeSiteSearch = {
    name?: string;
    pageNum: number;
    pageSize: number;
  };

  type EdgeSiteItem = {
    id: number;
    name: string;
  };

  type DeviceListItem = {
    id: number;
    name: string;
    esn: string;
    location: {
      lon: number;
      lat: number;
    };
  };

  type CountriesItem = {
    code: string;
    name: string;
    children: County[];
  };

  type OnlineCameras = {
    id: number;
    sn: string;
    name: string;
    streamUrl: string;
  };

  type OnlineType = {
    online: number;
    offline: number;
    notRegister: number;
  };

  type OnlineRateItem = {
    rsu: OnlineType;
    camera: OnlineType;
    radar: OnlineType;
    lidar: OnlineType;
    spat: OnlineType;
  };

  type RouteInfoItem = {
    vehicleTotal: number;
    averageSpeed: number;
    pedestrianTotal: number;
    congestion: string;
  };

  type ModelDefault = {
    intersectionCode: string;
    mapID: number;
    nodeID: number;
  };
}
