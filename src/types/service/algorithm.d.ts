declare namespace Algorithm {
  type AlgorithmVersion = {
    id: string | number | null;
    version: string;
  };

  type AlgorithmListItem = {
    id: number;
    module: string;
    algo: string;
    enable: boolean;
    inUse: string;
    modulePath: string;
    updateTime: string;
    version: AlgorithmVersion[];
  };

  type CreateAlgorithmVersion = {
    algo: string;
    module: string;
    version: string;
  };

  type UpdateAlgorithmItem = {
    module: string;
    algo: string;
    enable: boolean;
    inUse: string;
  };

  type ServiceType = {
    id: number;
    name: string;
    description: string;
  };

  type ServiceItem = ServiceType & {
    type_id: number;
    vendor: string;
  };

  type ServiceEndpoint = {
    id: number;
    service_id: number;
    enabled: boolean;
    url: string;
  };
}
