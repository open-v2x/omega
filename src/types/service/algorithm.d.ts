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
}
